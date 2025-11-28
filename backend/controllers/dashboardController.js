import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTimeSpentLearning = async(req,res) => {
    try {
        // Get last 7 days of data only
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const trackings = await prisma.developer_journey_trackings.findMany({
            select: {
                last_viewed: true,
                first_opened_at: true
            },
            where: {
                AND: [
                    { last_viewed: { not: null } },
                    { first_opened_at: { not: null } },
                    { last_viewed: { gte: sevenDaysAgo } }
                ]
            },
            take: 1000
        });
        
        // Group by day of week from last_viewed
        const dayGroups = {};
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        
        trackings.forEach(tracking => {
            const lastViewed = new Date(tracking.last_viewed);
            const firstOpened = new Date(tracking.first_opened_at);
            
            // Calculate study time in minutes (max 3 hours per session)
            const studyTime = Math.min(180, Math.max(0, (lastViewed - firstOpened) / (1000 * 60)));
            
            const dayIndex = lastViewed.getDay();
            const dayName = days[dayIndex];
            
            if (!dayGroups[dayName]) {
                dayGroups[dayName] = 0;
            }
            dayGroups[dayName] += studyTime;
        });
        
        // Format for chart
        const chartData = days.map((day, index) => ({
            day: dayLabels[index],
            hours: Math.round((dayGroups[day] || 0) / 60 / 60)
        }));
            
        res.status(200).json(chartData);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getCourseCompletion = async(req,res) => {
    try {
        const trackings = await prisma.developer_journey_trackings.findMany({
            select: {
                status: true
            },
            where: {
                developer_id: req.userId
            }
        });
        
        // Count real status from database
        const statusCount = {
            completed: 0,
            in_progress: 0,
            not_started: 0,
            not_completed: 0
        };
        
        trackings.forEach(tracking => {
            const status = tracking.status?.toString();
            if (status === '1' || status === 'completed') {
                statusCount.completed++;
            } else if (status === '2' || status === 'in_progress') {
                statusCount.in_progress++;
            } else if (status === '0' || status === 'not_completed') {
                statusCount.not_completed++;
            } else {
                statusCount.not_started++;
            }
        });
        
        const total = trackings.length;
        const completedPercentage = total > 0 ? Math.round((statusCount.completed / total) * 100) : 0;
        
        const chartData = {
            completed: {
                count: statusCount.completed,
                percentage: completedPercentage
            },
            in_progress: {
                count: statusCount.in_progress
            },
            not_started: {
                count: statusCount.not_started
            },
            not_completed: {
                count: statusCount.not_completed
            },
            total: total
        };
        
        res.status(200).json(chartData);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}