import XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rebuildRelations = async () => {
  try {
    console.log('Rebuilding relationships using alternative identifiers...');

    // Get all users with their original IDs from Excel
    const usersWorkbook = XLSX.readFile('users.xlsx');
    const usersSheet = usersWorkbook.Sheets[usersWorkbook.SheetNames[0]];
    const usersData = XLSX.utils.sheet_to_json(usersSheet);
    
    // Create mapping from original ID to new database ID
    const userIdMap = new Map();
    for (const userData of usersData) {
      const dbUser = await prisma.users.findUnique({
        where: { email: userData.email }
      });
      if (dbUser) {
        userIdMap.set(userData.id, dbUser.id);
      }
    }
    console.log(`Created user ID mapping for ${userIdMap.size} users`);

    // Update developer_journeys instructor/reviewer relationships
    const journeysWorkbook = XLSX.readFile('developer_journeys.xlsx');
    const journeysSheet = journeysWorkbook.Sheets[journeysWorkbook.SheetNames[0]];
    const journeysData = XLSX.utils.sheet_to_json(journeysSheet);
    
    const journeyIdMap = new Map();
    for (const journeyData of journeysData) {
      const dbJourney = await prisma.developer_journeys.findFirst({
        where: { name: journeyData.name }
      });
      if (dbJourney) {
        journeyIdMap.set(journeyData.id, dbJourney.id);
        
        // Update instructor and reviewer if they exist in our user mapping
        const instructorId = userIdMap.get(journeyData.instructor_id);
        const reviewerId = userIdMap.get(journeyData.reviewer_id);
        
        if (instructorId || reviewerId) {
          await prisma.developer_journeys.update({
            where: { id: dbJourney.id },
            data: {
              instructor_id: instructorId || null,
              reviewer_id: reviewerId || null
            }
          });
        }
      }
    }
    console.log(`Updated ${journeyIdMap.size} journey relationships`);

    // Update tutorial relationships
    const tutorialsWorkbook = XLSX.readFile('developer_journey_tutorials.xlsx');
    const tutorialsSheet = tutorialsWorkbook.Sheets[tutorialsWorkbook.SheetNames[0]];
    const tutorialsData = XLSX.utils.sheet_to_json(tutorialsSheet);
    
    const tutorialIdMap = new Map();
    let tutorialCount = 0;
    for (const tutorialData of tutorialsData) {
      const dbTutorial = await prisma.developer_journey_tutorials.findFirst({
        where: { 
          title: tutorialData.title,
          type: tutorialData.type
        }
      });
      if (dbTutorial) {
        tutorialIdMap.set(tutorialData.id, dbTutorial.id);
        
        const journeyId = journeyIdMap.get(tutorialData.developer_journey_id);
        const authorId = userIdMap.get(tutorialData.author_id);
        
        if (journeyId || authorId) {
          await prisma.developer_journey_tutorials.update({
            where: { id: dbTutorial.id },
            data: {
              developer_journey_id: journeyId || null,
              author_id: authorId || null
            }
          });
          tutorialCount++;
        }
      }
    }
    console.log(`Updated ${tutorialCount} tutorial relationships`);

    // Update tracking relationships (sample - first 1000 records)
    const trackingsWorkbook = XLSX.readFile('developer_journey_trackings.xlsx');
    const trackingsSheet = trackingsWorkbook.Sheets[trackingsWorkbook.SheetNames[0]];
    const trackingsData = XLSX.utils.sheet_to_json(trackingsSheet).slice(0, 1000);
    
    let trackingCount = 0;
    for (const trackingData of trackingsData) {
      const journeyId = journeyIdMap.get(trackingData.journey_id);
      const tutorialId = tutorialIdMap.get(trackingData.tutorial_id);
      const developerId = userIdMap.get(trackingData.developer_id);
      
      if (journeyId || tutorialId || developerId) {
        await prisma.developer_journey_trackings.updateMany({
          where: {
            status: trackingData.status,
            last_viewed: trackingData.last_viewed ? new Date(trackingData.last_viewed) : null
          },
          data: {
            journey_id: journeyId || null,
            tutorial_id: tutorialId || null,
            developer_id: developerId || null
          }
        });
        trackingCount++;
      }
    }
    console.log(`Updated ${trackingCount} tracking relationships`);

    // Update submission relationships
    const submissionsWorkbook = XLSX.readFile('developer_journey_submissions.xlsx');
    const submissionsSheet = submissionsWorkbook.Sheets[submissionsWorkbook.SheetNames[0]];
    const submissionsData = XLSX.utils.sheet_to_json(submissionsSheet);
    
    let submissionCount = 0;
    for (const submissionData of submissionsData) {
      const journeyId = journeyIdMap.get(submissionData.journey_id);
      const quizId = tutorialIdMap.get(submissionData.quiz_id);
      const submitterId = userIdMap.get(submissionData.submitter_id);
      const reviewerId = userIdMap.get(submissionData.reviewer_id);
      
      if (journeyId || quizId || submitterId || reviewerId) {
        await prisma.developer_journey_submissions.updateMany({
          where: {
            app_link: submissionData.app_link,
            status: submissionData.status
          },
          data: {
            journey_id: journeyId || null,
            quiz_id: quizId || null,
            submitter_id: submitterId || null,
            reviewer_id: reviewerId || null
          }
        });
        submissionCount++;
      }
    }
    console.log(`Updated ${submissionCount} submission relationships`);

    console.log('All relationships rebuilt successfully!');
  } catch (error) {
    console.error('Error rebuilding relations:', error);
  } finally {
    await prisma.$disconnect();
  }
};

rebuildRelations();