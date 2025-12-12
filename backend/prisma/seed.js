// File: backend/prisma/seed.js - VERSION 2.2 (FIXED FOR FRONTEND)

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ============================================
// DATA KONFIGURASI - DIPERBAIKI UNTUK FRONTEND
// ============================================
const usersData = [
    { 
        name: 'Bujang', 
        email: 'bujang@nexalar.com', 
        password: '123', 
        user_role: 'student', 
        persona: 'fast_learner'  // DIUBAH: dari 'fast' menjadi 'fast_learner'
    },
    { 
        name: 'Sarah', 
        email: 'sarah@nexalar.com', 
        password: '123', 
        user_role: 'student', 
        persona: 'consistent_learner'  // DIUBAH: dari 'consistent' menjadi 'consistent_learner'
    },
    { 
        name: 'Budi', 
        email: 'budi@nexalar.com', 
        password: '123', 
        user_role: 'student', 
        persona: 'reflective_learner'  // DIUBAH: dari 'reflective' menjadi 'reflective_learner'
    },
    { 
        name: 'Newbie', 
        email: 'newbie@nexalar.com', 
        password: '123', 
        user_role: 'student', 
        persona: 'new_learner'  // DIUBAH: dari 'new' menjadi 'new_learner'
    },
];

const coursesData = [
    { 
        title: 'Web Development Bootcamp', 
        hours: 40, 
        deadline: new Date('2026-06-01'),
        difficulty: 'Beginner',
        summary: 'Complete web development course from scratch to advanced',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js and more'
    },
    { 
        title: 'Python Programming', 
        hours: 30, 
        deadline: new Date('2026-08-15'),
        difficulty: 'Beginner',
        summary: 'Master Python programming fundamentals',
        description: 'Python syntax, data structures, OOP, and real-world projects'
    },
    { 
        title: 'Machine Learning 101', 
        hours: 35, 
        deadline: new Date('2026-12-10'),
        difficulty: 'Intermediate',
        summary: 'Introduction to machine learning algorithms',
        description: 'Learn supervised and unsupervised learning techniques'
    },
    { 
        title: 'Data Science Fundamentals', 
        hours: 25, 
        deadline: new Date('2026-05-20'),
        difficulty: 'Intermediate',
        summary: 'Data analysis and visualization',
        description: 'Pandas, NumPy, Matplotlib, and data storytelling'
    },
    { 
        title: 'Mobile App React Native', 
        hours: 45, 
        deadline: new Date('2026-09-01'),
        difficulty: 'Intermediate',
        summary: 'Build cross-platform mobile apps',
        description: 'React Native, Expo, mobile UI/UX design'
    },
    { 
        title: 'DevOps & CI/CD', 
        hours: 30, 
        deadline: new Date('2026-11-30'),
        difficulty: 'Advanced',
        summary: 'Modern DevOps practices',
        description: 'Docker, Kubernetes, Jenkins, AWS'
    },
    { 
        title: 'UI/UX Design Mastery', 
        hours: 25, 
        deadline: new Date('2026-07-20'),
        difficulty: 'Beginner',
        summary: 'Design beautiful user interfaces',
        description: 'Figma, prototyping, user research'
    },
    { 
        title: 'Agile Management', 
        hours: 10, 
        deadline: new Date('2026-04-15'),
        difficulty: 'Beginner',
        summary: 'Project management with Agile',
        description: 'Scrum, Kanban, sprint planning'
    },
    // EXPIRED COURSES (Untuk demo bagian "Not Completed")
    { 
        title: 'Legacy Systems Migration', 
        hours: 20, 
        deadline: new Date('2024-01-01'),
        difficulty: 'Advanced',
        summary: 'Migrate old systems to modern platforms',
        description: 'Legacy code, migration strategies'
    },
    { 
        title: 'Old Java Patterns', 
        hours: 15, 
        deadline: new Date('2023-12-31'),
        difficulty: 'Advanced',
        summary: 'Java design patterns',
        description: 'Singleton, Factory, Observer patterns'
    },
    { 
        title: 'Flash for Web', 
        hours: 10, 
        deadline: new Date('2020-01-01'),
        difficulty: 'Intermediate',
        summary: 'Adobe Flash for web animations',
        description: 'Flash animations and ActionScript'
    },
    { 
        title: 'Assembly Basics', 
        hours: 50, 
        deadline: new Date('2022-05-01'),
        difficulty: 'Advanced',
        summary: 'Low-level programming',
        description: 'Assembly language, CPU architecture'
    },
];

const tutorialTemplates = [
    { title: 'Introduction to Course', type: 'article' },
    { title: 'Setting Up Environment', type: 'article' },
    { title: 'Basic Concepts Quiz', type: 'quiz' },
    { title: 'Core Concepts Part 1', type: 'article' },
    { title: 'Core Concepts Part 2', type: 'article' },
    { title: 'Practical Exercise', type: 'article' },
    { title: 'Mid-term Quiz', type: 'quiz' },
    { title: 'Advanced Techniques', type: 'article' },
    { title: 'Project Submission', type: 'submission' },
    { title: 'Final Exam', type: 'quiz' }
];

// ============================================
// POMODORO RECOMMENDATION PER PERSONA
// ============================================
const pomodoroRecommendations = {
    'fast_learner': {
        focus_minutes: 30,
        rest_minutes: 7,
        rationale: "Fast learners benefit from slightly longer focus periods to maximize deep work, with adequate breaks to maintain intensity.",
        suggestion: "Try 30-7-21 timer for optimal productivity"
    },
    'consistent_learner': {
        focus_minutes: 25,
        rest_minutes: 5,
        rationale: "Consistent learners thrive with the classic Pomodoro rhythm that matches their steady, reliable study habits.",
        suggestion: "Classic 25-5-15 timer works best for your consistent pattern"
    },
    'reflective_learner': {
        focus_minutes: 45,
        rest_minutes: 10,
        rationale: "Reflective thinkers need longer sessions for deep contemplation, with substantial breaks for mental processing.",
        suggestion: "Extended 45-10-30 timer supports your reflective learning style"
    },
    'new_learner': {
        focus_minutes: 20,
        rest_minutes: 5,
        rationale: "New learners should start with shorter focus periods to build concentration stamina gradually.",
        suggestion: "Beginner-friendly 20-5-15 timer to build focus gradually"
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================
function getMondayOfWeek(weekOffset = 0) {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    monday.setDate(monday.getDate() - (weekOffset * 7));
    monday.setHours(0, 0, 0, 0);
    return monday;
}

function getDateInWeek(weekOffset, dayIndex) {
    const monday = getMondayOfWeek(weekOffset);
    const date = new Date(monday);
    date.setDate(date.getDate() + dayIndex);
    return date;
}

function getRandomTimeBetween(startHour, endHour) {
    const hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
    const minute = Math.floor(Math.random() * 60);
    return { hour, minute };
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function getWeekDates(weekOffset = 0) {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        dates.push(getDateInWeek(weekOffset, i));
    }
    return dates;
}

// ============================================
// DATA GENERATORS - DIPERBAIKI UNTUK PERSONA BARU
// ============================================
async function generateActivityForUser(user, weekOffset) {
    const weekDates = getWeekDates(weekOffset);
    const userCourses = await prisma.developer_journeys.findMany({
        where: {
            OR: [
                { instructor_id: user.id },
                { trackings: { some: { developer_id: user.id } } }
            ]
        },
        include: {
            tutorials: true
        }
    });

    const weekData = {
        totalMinutes: 0,
        pomodoroSessions: 0,
        activities: 0,
        quizzesCompleted: 0,
        modulesFinished: 0
    };

    // Tentukan jumlah aktivitas berdasarkan persona YANG BARU
    let dailyActivityCount = 0;
    let studyDuration = 0;
    
    switch(user.persona) {
        case 'fast_learner':
            dailyActivityCount = Math.floor(Math.random() * 3) + 3; // 3-5 activities per day
            studyDuration = Math.floor(Math.random() * 40) + 20; // 20-60 minutes
            break;
        case 'consistent_learner':
            dailyActivityCount = Math.floor(Math.random() * 2) + 2; // 2-3 activities per day
            studyDuration = Math.floor(Math.random() * 60) + 30; // 30-90 minutes
            break;
        case 'reflective_learner':
            dailyActivityCount = Math.floor(Math.random() * 4) + 1; // 1-4 activities per day
            studyDuration = Math.floor(Math.random() * 120) + 60; // 60-180 minutes
            break;
        default: // new_learner atau lainnya
            dailyActivityCount = 1;
            studyDuration = 30;
    }

    // Generate activity for each day in the week
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const currentDate = weekDates[dayIndex];
        const activityCount = Math.floor(Math.random() * (dailyActivityCount + 1));

        for (let activityIndex = 0; activityIndex < activityCount; activityIndex++) {
            const randomCourse = userCourses[Math.floor(Math.random() * userCourses.length)];
            if (!randomCourse || randomCourse.tutorials.length === 0) continue;

            const randomTutorial = randomCourse.tutorials[Math.floor(Math.random() * randomCourse.tutorials.length)];
            
            // Set waktu belajar (antara 8 AM - 10 PM)
            const { hour, minute } = getRandomTimeBetween(8, 22);
            const startTime = new Date(currentDate);
            startTime.setHours(hour, minute, 0, 0);
            const endTime = addMinutes(startTime, studyDuration);

            // Create tracking
            await prisma.developer_journey_trackings.create({
                data: {
                    journey_id: randomCourse.id,
                    tutorial_id: randomTutorial.id,
                    developer_id: user.id,
                    status: 1,
                    first_opened_at: startTime,
                    last_viewed: endTime,
                    completed_at: endTime,
                    created_at: startTime
                }
            });

            // Create pomodoro sessions (sesuai dengan rekomendasi persona)
            const pomodoroDuration = pomodoroRecommendations[user.persona]?.focus_minutes || 25;
            const pomodoroCount = Math.ceil(studyDuration / pomodoroDuration);
            
            for (let p = 0; p < pomodoroCount; p++) {
                const pomodoroTime = addMinutes(startTime, p * pomodoroDuration);
                await prisma.pomodoro_sessions.create({
                    data: {
                        user_id: user.id,
                        journey_id: randomCourse.id,
                        duration_minutes: pomodoroDuration,
                        completed_at: pomodoroTime
                    }
                });
                weekData.pomodoroSessions++;
            }

            // Create exam if tutorial is quiz
            if (randomTutorial.type === 'quiz') {
                const registration = await prisma.exam_registrations.create({
                    data: {
                        examinees_id: user.id,
                        tutorial_id: randomTutorial.id,
                        status: 'finished',
                        created_at: startTime,
                        exam_finished_at: endTime
                    }
                });

                // Generate score berdasarkan persona
                let score = 70;
                switch(user.persona) {
                    case 'fast_learner': 
                        score = Math.floor(Math.random() * 20) + 80; // 80-100
                        break;
                    case 'consistent_learner': 
                        score = Math.floor(Math.random() * 15) + 75; // 75-90
                        break;
                    case 'reflective_learner': 
                        score = Math.floor(Math.random() * 30) + 65; // 65-95
                        break;
                    case 'new_learner':
                        score = Math.floor(Math.random() * 25) + 60; // 60-85
                        break;
                }

                await prisma.exam_results.create({
                    data: {
                        exam_registration_id: registration.id,
                        total_questions: 20,
                        score: score,
                        is_passed: score >= 70,
                        created_at: endTime
                    }
                });
                weekData.quizzesCompleted++;
            }

            weekData.totalMinutes += studyDuration;
            weekData.activities++;
            weekData.modulesFinished++;
        }
    }

    return weekData;
}

// ============================================
// PERSONALIZED INSIGHTS PER PERSONA
// ============================================
const personalizedInsights = {
    'fast_learner': {
        insight: "You're a quick learner who excels in intensive sessions. Your ability to grasp concepts rapidly is impressive!",
        recommendation: "Focus on consolidating knowledge through spaced repetition. Try teaching concepts to others to deepen understanding."
    },
    'consistent_learner': {
        insight: "Your steady, consistent learning habits are your superpower. You build knowledge reliably over time.",
        recommendation: "Maintain your rhythm. Consider slightly increasing challenge levels to continue growth."
    },
    'reflective_learner': {
        insight: "You're a deep thinker who needs time to process information. Your thorough understanding is valuable.",
        recommendation: "Schedule reflection time after learning sessions. Journaling about what you've learned can be powerful."
    },
    'new_learner': {
        insight: "You're at the beginning of an exciting learning journey! Building strong foundations now will serve you well.",
        recommendation: "Start with short, focused sessions. Celebrate small wins and build momentum gradually."
    }
};

// ============================================
// MAIN SEED FUNCTION - DIPERBAIKI
// ============================================
async function main() {
    console.log('🚀 Starting UPDATED DATA SEED (Fixed for Frontend)...');

    // Clean database - HAPUS jika ingin fresh start
    try {
        console.log('⚠️  Clearing existing data...');
        await prisma.$executeRaw`TRUNCATE TABLE exam_results CASCADE`;
        await prisma.$executeRaw`TRUNCATE TABLE exam_registrations CASCADE`;
        await prisma.$executeRaw`TRUNCATE TABLE pomodoro_sessions CASCADE`;
        await prisma.$executeRaw`TRUNCATE TABLE developer_journey_trackings CASCADE`;
        await prisma.$executeRaw`TRUNCATE TABLE weekly_reports CASCADE`;
        await prisma.$executeRaw`TRUNCATE TABLE developer_journey_completions CASCADE`;
        await prisma.$executeRaw`TRUNCATE TABLE developer_journey_tutorials CASCADE`;
        await prisma.$executeRaw`TRUNCATE TABLE developer_journeys CASCADE`;
        await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
        await prisma.$executeRaw`TRUNCATE TABLE notifications CASCADE`;
    } catch(e) {
        console.log('Note: Some tables may not exist yet');
    }

    // Create users dengan data yang DIPERBAIKI
    const createdUsers = [];
    for(const u of usersData) {
        const recommendation = pomodoroRecommendations[u.persona];
        const insights = personalizedInsights[u.persona];
        
        const user = await prisma.users.create({
            data: {
                name: u.name,
                email: u.email,
                password: u.password,
                user_role: u.user_role,
                // AI Persona sebagai JSON
                ai_persona: JSON.stringify({
                    type: u.persona,
                    description: `${u.persona.replace('_', ' ')}`,
                    strengths: ['dedication', 'persistence'],
                    recommendations: ['keep going']
                }),
                // POMODORO CONFIG yang DIPERBAIKI untuk frontend
                pomodoro_config: JSON.stringify({
                    focusTime: recommendation?.focus_minutes || 25,
                    restTime: recommendation?.rest_minutes || 5,
                    longRestTime: (recommendation?.rest_minutes || 5) * 3,
                    useRecommended: true, // Frontend butuh ini
                    suggestion: recommendation?.suggestion || "Personalized timer based on your learning style",
                    lastUpdated: new Date().toISOString()
                }),
                learning_categories: JSON.stringify(['web_development', 'programming']),
                // DATA ML yang DIPERBAIKI untuk frontend
                ml_predicted_persona: u.persona, // HARUS sama dengan mapping di dashboardController
                ml_confidence: 0.85,
                ml_last_prediction_at: new Date(),
                personalized_insight: insights?.insight || `You are a ${u.persona.replace('_', ' ')} with great potential!`,
                learning_recommendation: insights?.recommendation || 'Focus on consistent practice and review materials regularly.',
                image_path: null,
                created_at: new Date('2024-01-01'),
                updated_at: new Date()
            }
        });
        createdUsers.push({...user, persona: u.persona});
        console.log(`✅ Created user: ${user.name} (${u.persona})`);
    }
    console.log(`✅ Created ${createdUsers.length} users with updated personas`);

    // Create courses and tutorials
    const instructor = createdUsers[0]; // Bujang sebagai instructor
    const createdCourses = [];
    
    for(const course of coursesData) {
        const createdCourse = await prisma.developer_journeys.create({
            data: {
                name: course.title,
                summary: course.summary,
                difficulty: course.difficulty,
                description: course.description,
                hours_to_study: course.hours,
                deadline: course.deadline,
                status: 'published',
                listed: true,
                instructor_id: instructor.id,
                created_at: new Date('2024-01-01'),
                updated_at: new Date()
            }
        });
        createdCourses.push(createdCourse);

        // Create tutorials for this course
        for(let i = 0; i < tutorialTemplates.length; i++) {
            await prisma.developer_journey_tutorials.create({
                data: {
                    developer_journey_id: createdCourse.id,
                    title: tutorialTemplates[i].title,
                    type: tutorialTemplates[i].type,
                    position: i + 1,
                    content: `This is the content for ${tutorialTemplates[i].title} in ${course.title}. Learn important concepts and practice with exercises.`,
                    status: 'published'
                }
            });
        }
        console.log(`✅ Created course: ${course.title}`);
    }
    console.log(`✅ Created ${createdCourses.length} courses with ${tutorialTemplates.length} tutorials each`);

    // Assign courses to users (all users get all courses)
    console.log('\n📚 Assigning courses to users...');
    for(const user of createdUsers) {
        for(const course of createdCourses) {
            // Create tracking untuk beberapa tutorial berdasarkan persona
            const courseTutorials = await prisma.developer_journey_tutorials.findMany({
                where: { developer_journey_id: course.id }
            });

            let completionPercentage = 0;
            switch(user.persona) {
                case 'fast_learner':
                    completionPercentage = course.deadline < new Date() ? 0.4 : 0.9;
                    break;
                case 'consistent_learner':
                    completionPercentage = course.deadline < new Date() ? 0.3 : 0.6;
                    break;
                case 'reflective_learner':
                    completionPercentage = course.deadline < new Date() ? 0.5 : 0.4;
                    break;
                case 'new_learner':
                    completionPercentage = 0;
                    break;
            }

            const tutorialsToComplete = Math.floor(courseTutorials.length * completionPercentage);
            
            for(let i = 0; i < tutorialsToComplete; i++) {
                const tutorial = courseTutorials[i];
                const activityDate = new Date();
                activityDate.setDate(activityDate.getDate() - Math.floor(Math.random() * 30));

                await prisma.developer_journey_trackings.create({
                    data: {
                        journey_id: course.id,
                        tutorial_id: tutorial.id,
                        developer_id: user.id,
                        status: 1,
                        first_opened_at: activityDate,
                        last_viewed: activityDate,
                        completed_at: activityDate,
                        created_at: activityDate
                    }
                });

                // If quiz, create exam result
                if (tutorial.type === 'quiz') {
                    const registration = await prisma.exam_registrations.create({
                        data: {
                            examinees_id: user.id,
                            tutorial_id: tutorial.id,
                            status: 'finished',
                            created_at: activityDate,
                            exam_finished_at: activityDate
                        }
                    });

                    // Score berdasarkan persona YANG BARU
                    let score = 75;
                    switch(user.persona) {
                        case 'fast_learner': 
                            score = 85 + Math.floor(Math.random() * 15); // 85-100
                            break;
                        case 'consistent_learner': 
                            score = 80 + Math.floor(Math.random() * 20); // 80-100
                            break;
                        case 'reflective_learner': 
                            score = 70 + Math.floor(Math.random() * 30); // 70-100
                            break;
                        case 'new_learner':
                            score = 60 + Math.floor(Math.random() * 25); // 60-85
                            break;
                    }

                    await prisma.exam_results.create({
                        data: {
                            exam_registration_id: registration.id,
                            total_questions: 20,
                            score: Math.min(100, score),
                            is_passed: score >= 70,
                            created_at: activityDate
                        }
                    });
                }
            }
        }
        console.log(`✅ Assigned courses to ${user.name} (${user.persona}) - ${user.persona === 'new_learner' ? '0% completion' : 'various completion %'}`);
    }

    // Generate 4 weeks of activity data untuk user aktif (kecuali new_learner)
    console.log('\n📊 Generating 4 weeks of activity data...');
    for(const user of createdUsers) {
        if (user.persona === 'new_learner') {
            console.log(`⏭️  Skipping activity generation for ${user.name} (new learner)`);
            continue;
        }
        
        console.log(`\n👤 Generating data for ${user.name} (${user.persona})...`);
        
        for(let weekOffset = 3; weekOffset >= 0; weekOffset--) {
            console.log(`   Week ${4 - weekOffset} (${weekOffset === 0 ? 'Current' : `${weekOffset} weeks ago`})`);
            
            const weekData = await generateActivityForUser(user, weekOffset);
            
            // Calculate week start and end dates
            const weekStart = getMondayOfWeek(weekOffset);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            
            // Calculate engagement score (0-100)
            const engagementScore = Math.min(100, 
                30 + // Base score
                (weekData.activities * 5) + // Activities bonus
                (weekData.pomodoroSessions * 2) + // Pomodoro bonus
                (weekData.quizzesCompleted * 8) // Quiz bonus
            );
            
            // Create weekly report
            await prisma.weekly_reports.create({
                data: {
                    user_id: user.id,
                    week_number: 4 - weekOffset,
                    week_start_date: weekStart,
                    week_end_date: weekEnd,
                    total_study_time_hours: parseFloat((weekData.totalMinutes / 60).toFixed(2)),
                    total_pomodoro_sessions: weekData.pomodoroSessions,
                    avg_session_duration: parseFloat((weekData.totalMinutes / Math.max(1, weekData.activities)).toFixed(2)),
                    total_activities: weekData.activities,
                    engagement_score: parseFloat(engagementScore.toFixed(1)),
                    created_at: weekEnd
                }
            });
            
            console.log(`     • Study Time: ${(weekData.totalMinutes / 60).toFixed(1)} hours`);
            console.log(`     • Pomodoros: ${weekData.pomodoroSessions} sessions`);
            console.log(`     • Activities: ${weekData.activities} modules`);
            console.log(`     • Quizzes: ${weekData.quizzesCompleted} completed`);
        }
    }

    // Create notifications untuk semua user
    console.log('\n🔔 Creating notifications...');
    for(const user of createdUsers) {
        await prisma.notifications.create({
            data: {
                user_id: user.id,
                title: 'Welcome to Nexalar!',
                message: 'Start your learning journey today with our curated courses.',
                priority: 'normal',
                is_read: false,
                created_at: new Date()
            }
        });
        
        if (user.persona !== 'new_learner') {
            await prisma.notifications.create({
                data: {
                    user_id: user.id,
                    title: 'Weekly Report Available',
                    message: 'Your weekly learning report is ready. Check your progress!',
                    priority: 'normal',
                    is_read: true,
                    created_at: new Date()
                }
            });
            
            // Notification khusus untuk pomodoro recommendation
            await prisma.notifications.create({
                data: {
                    user_id: user.id,
                    title: 'Pomodoro Settings Updated',
                    message: `Personalized timer settings applied for ${user.persona.replace('_', ' ')}`,
                    priority: 'normal',
                    is_read: false,
                    created_at: new Date()
                }
            });
        }
        console.log(`✅ Created notifications for ${user.name}`);
    }

    // FINAL SUMMARY
    console.log('\n🎉 SEED COMPLETED SUCCESSFULLY!');
    console.log('=====================================');
    console.log('📊 DATA SUMMARY (FIXED FOR FRONTEND):');
    console.log(`   • Users: ${createdUsers.length} (with corrected personas)`);
    console.log(`   • Persona mapping: fast_learner, consistent_learner, reflective_learner, new_learner`);
    console.log(`   • Courses: ${createdCourses.length} (8 active, 4 expired for demo)`);
    console.log(`   • Activity: 4 weeks data for fast/consistent/reflective learners`);
    console.log(`   • Pomodoro: Personalized recommendations per persona`);
    console.log(`   • ML Data: ml_predicted_persona matches frontend mapping`);
    console.log('=====================================');
    console.log('\n🔧 To use this seed:');
    console.log('   npx prisma db push --force-reset  (if needed)');
    console.log('   npx prisma db seed');
    console.log('\n🚀 Login credentials:');
    console.log('   1. Fast Learner: bujang@nexalar.com / 123');
    console.log('   2. Consistent Learner: sarah@nexalar.com / 123');
    console.log('   3. Reflective Learner: budi@nexalar.com / 123');
    console.log('   4. New Learner: newbie@nexalar.com / 123');
    console.log('\n⚠️  IMPORTANT: Make sure ml-service is running for ML recommendations!');
}

// ============================================
// EXECUTE SEED
// ============================================
main()
    .catch(e => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });