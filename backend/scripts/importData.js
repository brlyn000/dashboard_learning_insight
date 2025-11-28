import XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const importData = async () => {
  try {
    // Import users
    const usersWorkbook = XLSX.readFile('users.xlsx');
    const usersSheet = usersWorkbook.Sheets[usersWorkbook.SheetNames[0]];
    const usersData = XLSX.utils.sheet_to_json(usersSheet);
    
    for (const user of usersData) {
      await prisma.users.upsert({
        where: { email: user.email },
        update: {},
        create: {
          display_name: user.display_name,
          name: user.name,
          email: user.email,
          password: user.password || 'defaultpassword',
          phone: user.phone,
          user_role: user.user_role,
          user_verification_status: user.user_verification_status === '1' || user.user_verification_status === 1,
          created_at: user.created_at ? new Date(user.created_at) : null,
          updated_at: user.updated_at ? new Date(user.updated_at) : null,
          city: user.city,
          refresh_token: user.refresh_token
        }
      });
    }
    console.log(`Imported ${usersData.length} users`);

    // Import developer_journeys
    const journeysWorkbook = XLSX.readFile('developer_journeys.xlsx');
    const journeysSheet = journeysWorkbook.Sheets[journeysWorkbook.SheetNames[0]];
    const journeysData = XLSX.utils.sheet_to_json(journeysSheet);
    
    for (const journey of journeysData) {
      await prisma.developer_journeys.create({
        data: {
          name: journey.name,
          summary: journey.summary,
          point: journey.point ? parseInt(journey.point) : null,
          required_point: journey.required_point ? parseInt(journey.required_point) : null,
          xp: journey.xp ? parseInt(journey.xp) : null,
          required_xp: journey.required_xp ? parseInt(journey.required_xp) : null,
          difficulty: journey.difficulty,
          status: journey.status,
          created_at: journey.created_at ? new Date(journey.created_at) : null,
          updated_at: journey.updated_at ? new Date(journey.updated_at) : null,
          instructor_id: null,
          reviewer_id: null
        }
      });
    }
    console.log(`Imported ${journeysData.length} developer journeys`);

    // Import developer_journey_tutorials
    const tutorialsWorkbook = XLSX.readFile('developer_journey_tutorials.xlsx');
    const tutorialsSheet = tutorialsWorkbook.Sheets[tutorialsWorkbook.SheetNames[0]];
    const tutorialsData = XLSX.utils.sheet_to_json(tutorialsSheet);
    
    for (const tutorial of tutorialsData) {
      await prisma.developer_journey_tutorials.create({
        data: {
          developer_journey_id: null,
          title: tutorial.title,
          type: tutorial.type,
          content: tutorial.content,
          position: tutorial.position ? parseInt(tutorial.position) : null,
          status: tutorial.status,
          created_at: tutorial.created_at ? new Date(tutorial.created_at) : null,
          updated_at: tutorial.updated_at ? new Date(tutorial.updated_at) : null,
          author_id: null
        }
      });
    }
    console.log(`Imported ${tutorialsData.length} tutorials`);

    // Import developer_journey_trackings
    const trackingsWorkbook = XLSX.readFile('developer_journey_trackings.xlsx');
    const trackingsSheet = trackingsWorkbook.Sheets[trackingsWorkbook.SheetNames[0]];
    const trackingsData = XLSX.utils.sheet_to_json(trackingsSheet);
    
    for (const tracking of trackingsData) {
      await prisma.developer_journey_trackings.create({
        data: {
          journey_id: null,
          tutorial_id: null,
          developer_id: null,
          status: tracking.status,
          last_viewed: tracking.last_viewed ? new Date(tracking.last_viewed) : null,
          first_opened_at: tracking.first_opened_at ? new Date(tracking.first_opened_at) : null,
          completed_at: tracking.completed_at ? new Date(tracking.completed_at) : null
        }
      });
    }
    console.log(`Imported ${trackingsData.length} trackings`);

    // Import developer_journey_submissions
    const submissionsWorkbook = XLSX.readFile('developer_journey_submissions.xlsx');
    const submissionsSheet = submissionsWorkbook.Sheets[submissionsWorkbook.SheetNames[0]];
    const submissionsData = XLSX.utils.sheet_to_json(submissionsSheet);
    
    for (const submission of submissionsData) {
      await prisma.developer_journey_submissions.create({
        data: {
          journey_id: null,
          quiz_id: null,
          submitter_id: null,
          app_link: submission.app_link,
          app_comment: submission.app_comment,
          status: submission.status,
          reviewer_id: null,
          rating: submission.rating ? parseInt(submission.rating) : null,
          note: submission.note,
          created_at: submission.created_at ? new Date(submission.created_at) : null,
          updated_at: submission.updated_at ? new Date(submission.updated_at) : null
        }
      });
    }
    console.log(`Imported ${submissionsData.length} submissions`);

    // Import developer_journey_completions
    const completionsWorkbook = XLSX.readFile('developer_journey_completions.xlsx');
    const completionsSheet = completionsWorkbook.Sheets[completionsWorkbook.SheetNames[0]];
    const completionsData = XLSX.utils.sheet_to_json(completionsSheet);
    
    for (const completion of completionsData) {
      await prisma.developer_journey_completions.create({
        data: {
          user_id: null,
          journey_id: null,
          created_at: completion.created_at ? new Date(completion.created_at) : null,
          updated_at: completion.updated_at ? new Date(completion.updated_at) : null,
          enrolling_times: completion.enrolling_times ? parseInt(completion.enrolling_times) : null,
          study_duration: completion.study_duration ? parseInt(completion.study_duration) : null,
          avg_submission_rating: completion.avg_submission_rating ? parseFloat(completion.avg_submission_rating) : null
        }
      });
    }
    console.log(`Imported ${completionsData.length} completions`);

    // Import exam_registrations
    const examRegsWorkbook = XLSX.readFile('exam_registrations.xlsx');
    const examRegsSheet = examRegsWorkbook.Sheets[examRegsWorkbook.SheetNames[0]];
    const examRegsData = XLSX.utils.sheet_to_json(examRegsSheet);
    
    for (const examReg of examRegsData) {
      await prisma.exam_registrations.create({
        data: {
          exam_module_id: examReg.exam_module_id,
          tutorial_id: null,
          examinees_id: null,
          status: examReg.status,
          created_at: examReg.created_at ? new Date(examReg.created_at) : null,
          updated_at: examReg.updated_at ? new Date(examReg.updated_at) : null,
          deadline_at: examReg.deadline_at ? new Date(examReg.deadline_at) : null
        }
      });
    }
    console.log(`Imported ${examRegsData.length} exam registrations`);

    // Import exam_results
    const examResultsWorkbook = XLSX.readFile('exam_results.xlsx');
    const examResultsSheet = examResultsWorkbook.Sheets[examResultsWorkbook.SheetNames[0]];
    const examResultsData = XLSX.utils.sheet_to_json(examResultsSheet);
    
    for (const examResult of examResultsData) {
      await prisma.exam_results.create({
        data: {
          exam_registration_id: null,
          total_questions: examResult.total_questions ? parseInt(examResult.total_questions) : null,
          score: examResult.score ? parseInt(examResult.score) : null,
          is_passed: examResult.is_passed === '1' || examResult.is_passed === 1,
          created_at: examResult.created_at ? new Date(examResult.created_at) : null,
          look_report_at: examResult.look_report_at ? new Date(examResult.look_report_at) : null
        }
      });
    }
    console.log(`Imported ${examResultsData.length} exam results`);

    console.log('All data imported successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

importData();