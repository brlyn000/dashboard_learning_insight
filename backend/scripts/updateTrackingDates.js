import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateTrackingDates = async () => {
  try {
    const trackings = await prisma.developer_journey_trackings.findMany();
    
    console.log(`Updating ${trackings.length} tracking records...`);
    
    for (let i = 0; i < trackings.length; i++) {
      const tracking = trackings[i];
      
      // Generate realistic dates within last 30 days
      const now = new Date();
      const daysAgo = Math.floor(Math.random() * 30);
      const baseDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      
      // first_opened_at: random time during the day
      const firstOpened = new Date(baseDate);
      firstOpened.setHours(Math.floor(Math.random() * 12) + 8); // 8AM-8PM
      firstOpened.setMinutes(Math.floor(Math.random() * 60));
      
      // last_viewed: 30-180 minutes after first_opened
      const studyDuration = Math.floor(Math.random() * 150) + 30; // 30-180 minutes
      const lastViewed = new Date(firstOpened.getTime() + (studyDuration * 60 * 1000));
      
      await prisma.developer_journey_trackings.update({
        where: { id: tracking.id },
        data: {
          first_opened_at: firstOpened,
          last_viewed: lastViewed
        }
      });
      
      if (i % 1000 === 0) {
        console.log(`Updated ${i} records...`);
      }
    }
    
    console.log('All tracking dates updated successfully!');
  } catch (error) {
    console.error('Error updating tracking dates:', error);
  } finally {
    await prisma.$disconnect();
  }
};

updateTrackingDates();