import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';


const PERSONA_NOTIFICATIONS = {
  'consistent_learner': [
    { title: 'Keep Your Streak! 🔥', message: 'You\'ve been consistent this week. Complete one more session to maintain your rhythm.' },
    { title: 'Schedule Reminder', message: 'Your usual study time is approaching. Ready to continue your learning journey?' },
    { title: 'Weekly Goal Check', message: 'You\'re 80% towards your weekly goal. A few more sessions will get you there!' }
  ],
  'fast_learner': [
    { title: 'Challenge Available! ⚡', message: 'You\'re progressing quickly! Try a harder module to maximize your potential.' },
    { title: 'Quick Win Opportunity', message: 'You have 15 minutes? Complete a quick quiz to boost your score!' },
    { title: 'New Content Alert', message: 'Fresh material available! Your fast learning style will help you master it quickly.' }
  ],
  'new_learner': [
    { title: 'Welcome Tip 💡', message: 'Start with a 15-minute focus session. Small steps lead to big achievements!' },
    { title: 'Beginner Milestone', message: 'You completed your first module! Keep exploring at your own pace.' },
    { title: 'Learning Path Suggestion', message: 'Based on your interests, we recommend starting with the basics course.' }
  ],
  'reflective_learner': [
    { title: 'Deep Dive Time 🧠', message: 'Take your time with today\'s material. Your thorough approach leads to better retention.' },
    { title: 'Review Suggestion', message: 'Consider reviewing yesterday\'s lesson before moving forward.' },
    { title: 'Reflection Prompt', message: 'What did you learn this week? Taking notes helps consolidate knowledge.' }
  ]
};


export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const notifications = await prisma.notifications.findMany({
      where: { user_id: userId },
      orderBy: [
        { is_read: 'asc' },
        { created_at: 'desc' }
      ],
      take: 20
    });

    res.json({
      success: true,
      notifications: notifications.map(n => ({
        id: n.id,
        title: n.title,
        message: n.message,
        priority: n.priority,
        isRead: n.is_read,
        createdAt: n.created_at
      }))
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ success: false, message: 'Failed to get notifications' });
  }
};


export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    
    await prisma.notifications.delete({
      where: { id: notificationId }
    });

    res.json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete notification' });
  }
};


export const clearAllNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await prisma.notifications.deleteMany({
      where: { user_id: userId }
    });

    res.json({ 
      success: true, 
      message: `Deleted ${result.count} notifications` 
    });
  } catch (error) {
    console.error('Clear notifications error:', error);
    res.status(500).json({ success: false, message: 'Failed to clear notifications' });
  }
};


export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    
    await prisma.notifications.update({
      where: { id: notificationId },
      data: { is_read: true }
    });

    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ success: false, message: 'Failed to mark notification' });
  }
};


export const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    
    await prisma.notifications.updateMany({
      where: { user_id: userId, is_read: false },
      data: { is_read: true }
    });

    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({ success: false, message: 'Failed to mark notifications' });
  }
};


export const generatePersonalNotification = async (req, res) => {
  try {
    const { userId } = req.params;
    

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        ml_predicted_persona: true
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const persona = user.ml_predicted_persona || 'new_learner';
    

    let notification;
    try {
      const mlResponse = await axios.post(`${ML_SERVICE_URL}/notification/generate`, {
        user_id: userId,
        persona: persona,
        user_name: user.name
      }, { timeout: 5000 });

      if (mlResponse.data && mlResponse.data.title) {
        notification = {
          title: mlResponse.data.title,
          message: mlResponse.data.message,
          priority: mlResponse.data.priority || 'normal'
        };
      }
    } catch (mlError) {
      console.log('ML service unavailable, using fallback templates');
    }


    if (!notification) {
      const templates = PERSONA_NOTIFICATIONS[persona] || PERSONA_NOTIFICATIONS['new_learner'];
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      notification = {
        title: randomTemplate.title,
        message: randomTemplate.message.replace('{name}', user.name),
        priority: 'normal'
      };
    }


    const saved = await prisma.notifications.create({
      data: {
        user_id: userId,
        title: notification.title,
        message: notification.message,
        priority: notification.priority,
        is_read: false
      }
    });

    res.json({
      success: true,
      notification: {
        id: saved.id,
        title: saved.title,
        message: saved.message,
        priority: saved.priority,
        isRead: false,
        createdAt: saved.created_at
      }
    });
  } catch (error) {
    console.error('Generate notification error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate notification' });
  }
};
