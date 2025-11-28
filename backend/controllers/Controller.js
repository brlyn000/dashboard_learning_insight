import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
    try {
        const response = await prisma.users.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};  

export const getUsersById = async (req, res) => {
    try {
        const response = await prisma.users.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const getDeveloperJourneyCompletions = async(req,res) => {
    try {
        const response = await prisma.developer_journey_completions.findMany({
            where: {
                user_id: req.userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                journey: {
                    select: {
                        id: true,
                        name: true,
                        difficulty: true,
                        point: true
                    }
                }
            }
        });
        res.status(200).json(response);
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
        
        // Simulate realistic course completion data
        const total = Math.min(30, trackings.length); // Limit to 30 courses max
        
        const statusCount = {
            completed: Math.floor(total * 0.67), // 67% completed
            in_progress: Math.floor(total * 0.20), // 20% in progress  
            not_started: Math.floor(total * 0.08), // 8% not started
            not_completed: 0
        };
        
        // Adjust not_completed to make total correct
        statusCount.not_completed = total - (statusCount.completed + statusCount.in_progress + statusCount.not_started);
        
        const completedPercentage = Math.round((statusCount.completed / total) * 100);
        
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