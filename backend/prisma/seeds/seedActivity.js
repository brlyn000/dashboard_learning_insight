// File: backend/prisma/seeds/seedActivity.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Helper: Mundur hari
const subDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
};

export async function seedActivity(usersMap, coursesList) {
    console.log("⚙️ Running Deep Seeding (Modules & 4 Weeks Activity)...");

    // 1. BUAT KURIKULUM (MODUL/TUTORIALS) UNTUK SETIAP KURSUS
    const courseCurriculumMap = {}; 

    for (const course of coursesList) {
        const tutorials = [];
        
        // Struktur Silabus Realistis (10 Item)
        const syllabus = [
            { title: "Introduction to Course", type: "article" },
            { title: "Setting Up Environment", type: "article" },
            { title: "Core Concept A", type: "article" },
            { title: "Quiz: Basic Concepts", type: "quiz" },
            { title: "Core Concept B", type: "article" },
            { title: "Practical Exercise", type: "article" },
            { title: "Quiz: Logic Check", type: "quiz" },
            { title: "Advanced Techniques", type: "article" },
            { title: "Final Exam", type: "quiz" },
            { title: "Final Project Submission", type: "submission" }
        ];
        
        let pos = 1;
        for (const item of syllabus) {
            const tut = await prisma.developer_journey_tutorials.create({
                data: {
                    developer_journey_id: course.id,
                    title: item.title,
                    position: pos++,
                    type: item.type,
                    content: "Lorem ipsum learning content.",
                    status: "published"
                }
            });
            tutorials.push(tut);
        }
        courseCurriculumMap[course.id] = tutorials;
    }
    console.log("✅ Modules Generated (10 items per Course)");

    // --- FUNGSI GENERATOR RIWAYAT BELAJAR DENGAN 4 MINGGU QUIZ DATA ---
    const generateStudentHistory = async (user, userType) => {
        console.log(`📊 Generating 4 weeks quiz data for ${user.name} (${userType})...`);
        
        // Tentukan jumlah kursus yang diambil berdasarkan tipe user
        const coursesCount = userType === 'fast' ? 6 : (userType === 'consistent' ? 4 : 2);
        const myCourses = coursesList.slice(0, coursesCount);

        // Array untuk menyimpan quiz modules yang akan digunakan untuk 4 minggu
        const quizModulesForWeeks = [];
        
        // Kumpulkan semua modul quiz dari semua kursus yang diambil
        for (const course of myCourses) {
            const modules = courseCurriculumMap[course.id];
            const quizModules = modules.filter(mod => mod.type === 'quiz');
            quizModulesForWeeks.push(...quizModules.slice(0, 4)); // Ambil 4 quiz per course untuk 4 minggu
        }
        
        // Jika tidak cukup quiz modules, buat beberapa quiz dummy
        while (quizModulesForWeeks.length < 4) {
            const course = myCourses[0];
            const modules = courseCurriculumMap[course.id];
            const quizModule = modules.find(mod => mod.type === 'quiz');
            if (quizModule) {
                quizModulesForWeeks.push(quizModule);
            } else {
                break;
            }
        }
        
        console.log(`   Available quiz modules: ${quizModulesForWeeks.length}`);
        
        // Buat data quiz untuk 4 minggu DENGAN PASTI ADA DATA DI SETIAP WEEK
        const today = new Date();
        
        for (let week = 1; week <= 4; week++) {
            let minDaysAgo, maxDaysAgo;
            
            switch(week) {
                case 1: minDaysAgo = 22; maxDaysAgo = 28; break;
                case 2: minDaysAgo = 15; maxDaysAgo = 21; break;
                case 3: minDaysAgo = 8;  maxDaysAgo = 14; break;
                case 4: minDaysAgo = 0;  maxDaysAgo = 7;  break;
            }
            
            if (week - 1 < quizModulesForWeeks.length) {
                const quizModule = quizModulesForWeeks[week - 1];
                const courseId = quizModule.developer_journey_id;
                
                const daysAgo = minDaysAgo + Math.floor(Math.random() * (maxDaysAgo - minDaysAgo + 1));
                const activityDate = subDays(today, daysAgo);
                
                let score = 75;
                if (userType === 'fast') {
                    score = 85 + Math.floor(Math.random() * 15);
                } else if (userType === 'consistent') {
                    const baseScores = [80, 84, 88, 92];
                    score = baseScores[week - 1] + Math.floor(Math.random() * 5);
                } else if (userType === 'reflective') {
                    const baseScores = [68, 75, 85, 95];
                    score = baseScores[week - 1] + Math.floor(Math.random() * 5);
                }
                
                score = Math.min(100, Math.max(0, score));
                
                await prisma.developer_journey_trackings.create({
                    data: {
                        journey_id: courseId,
                        tutorial_id: quizModule.id,
                        developer_id: user.id,
                        status: 1,
                        first_opened_at: activityDate,
                        last_viewed: activityDate,
                        created_at: activityDate
                    }
                });
                
                const reg = await prisma.exam_registrations.create({
                    data: {
                        examinees_id: user.id,
                        tutorial_id: quizModule.id,
                        status: "finished",
                        created_at: activityDate,
                        updated_at: activityDate,
                        exam_finished_at: activityDate
                    }
                });

                await prisma.exam_results.create({
                    data: {
                        exam_registration_id: reg.id,
                        total_questions: 20,
                        score: Math.round(score),
                        is_passed: score >= 70,
                        created_at: activityDate
                    }
                });
                
                console.log(`   Week ${week}: Score ${score} on "${quizModule.title}"`);
            } else {
                console.log(`   ⚠️ No quiz module available for Week ${week}`);
            }
        }
        
        // Fakultatif: Buat tracking untuk modul non-quiz
        for (const course of myCourses) {
            const modules = courseCurriculumMap[course.id];
            let progressRatio = 0;
            if (userType === 'fast') progressRatio = 0.95;
            else if (userType === 'consistent') progressRatio = 1.0;
            else progressRatio = 0.4;

            const modulesDoneCount = Math.floor(modules.length * progressRatio);

            for (let i = 0; i < modulesDoneCount; i++) {
                const mod = modules[i];
                if (mod.type === 'quiz') continue;
                
                const daysAgo = Math.floor(Math.random() * 30);
                const activityDate = subDays(new Date(), daysAgo);
                
                await prisma.developer_journey_trackings.create({
                    data: {
                        journey_id: course.id,
                        tutorial_id: mod.id,
                        developer_id: user.id,
                        status: 1,
                        first_opened_at: activityDate,
                        last_viewed: activityDate,
                        created_at: activityDate
                    }
                });
            }
        }
        
        console.log(`✅ Generated 4 weeks quiz and module data for ${user.name}`);
    };

    // Generasi aktivitas untuk user spesifik berdasarkan persona
    if (usersMap['Bujang']) await generateStudentHistory(usersMap['Bujang'], 'fast');
    if (usersMap['Sarah']) await generateStudentHistory(usersMap['Sarah'], 'consistent');
    if (usersMap['Budi']) await generateStudentHistory(usersMap['Budi'], 'reflective');

    console.log("✅ 4 Weeks Activity Data Generated!");
}