import XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateRelations = async () => {
  try {
    console.log('Updating foreign key relationships...');

    // Update developer_journeys relations
    const journeysWorkbook = XLSX.readFile('developer_journeys.xlsx');
    const journeysSheet = journeysWorkbook.Sheets[journeysWorkbook.SheetNames[0]];
    const journeysData = XLSX.utils.sheet_to_json(journeysSheet);
    
    for (const journey of journeysData) {
      if (journey.instructor_id || journey.reviewer_id) {
        await prisma.developer_journeys.updateMany({
          where: { name: journey.name },
          data: {
            instructor_id: journey.instructor_id || null,
            reviewer_id: journey.reviewer_id || null
          }
        });
      }
    }
    console.log('Updated developer_journeys relations');

    // Update tutorials relations
    const tutorialsWorkbook = XLSX.readFile('developer_journey_tutorials.xlsx');
    const tutorialsSheet = tutorialsWorkbook.Sheets[tutorialsWorkbook.SheetNames[0]];
    const tutorialsData = XLSX.utils.sheet_to_json(tutorialsSheet);
    
    for (const tutorial of tutorialsData) {
      if (tutorial.developer_journey_id || tutorial.author_id) {
        await prisma.developer_journey_tutorials.updateMany({
          where: { title: tutorial.title },
          data: {
            developer_journey_id: tutorial.developer_journey_id || null,
            author_id: tutorial.author_id || null
          }
        });
      }
    }
    console.log('Updated tutorials relations');

    // Update trackings relations
    const trackingsWorkbook = XLSX.readFile('developer_journey_trackings.xlsx');
    const trackingsSheet = trackingsWorkbook.Sheets[trackingsWorkbook.SheetNames[0]];
    const trackingsData = XLSX.utils.sheet_to_json(trackingsSheet);
    
    let trackingCount = 0;
    for (const tracking of trackingsData) {
      if (tracking.journey_id || tracking.tutorial_id || tracking.developer_id) {
        await prisma.developer_journey_trackings.updateMany({
          where: { 
            AND: [
              { status: tracking.status },
              { last_viewed: tracking.last_viewed ? new Date(tracking.last_viewed) : null }
            ]
          },
          data: {
            journey_id: tracking.journey_id || null,
            tutorial_id: tracking.tutorial_id || null,
            developer_id: tracking.developer_id || null
          }
        });
        trackingCount++;
        if (trackingCount % 1000 === 0) {
          console.log(`Updated ${trackingCount} trackings...`);
        }
      }
    }
    console.log('Updated trackings relations');

    console.log('All relations updated successfully!');
  } catch (error) {
    console.error('Error updating relations:', error);
  } finally {
    await prisma.$disconnect();
  }
};

updateRelations();