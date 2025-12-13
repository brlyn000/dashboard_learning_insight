-- Setup Database Schema untuk Supabase
-- Run this in Supabase SQL Editor

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    user_role TEXT DEFAULT 'student',
    image_path TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    ai_persona JSONB,
    pomodoro_config JSONB,
    learning_categories JSONB,
    refresh_token TEXT,
    ml_predicted_persona TEXT,
    ml_confidence FLOAT,
    ml_last_prediction_at TIMESTAMPTZ,
    personalized_insight TEXT,
    learning_recommendation TEXT
);

-- 2. WEEKLY REPORTS
CREATE TABLE IF NOT EXISTS weekly_reports (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    week_number INT NOT NULL,
    week_start_date DATE NOT NULL,
    week_end_date DATE NOT NULL,
    total_study_time_hours FLOAT DEFAULT 0,
    total_pomodoro_sessions INT DEFAULT 0,
    avg_session_duration FLOAT DEFAULT 0,
    total_activities INT DEFAULT 0,
    engagement_score FLOAT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'normal',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DEVELOPER JOURNEYS (Courses)
CREATE TABLE IF NOT EXISTS developer_journeys (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    summary TEXT,
    difficulty TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'draft',
    listed BOOLEAN DEFAULT TRUE,
    instructor_id TEXT NOT NULL REFERENCES users(id),
    reviewer_id TEXT REFERENCES users(id),
    deadline TIMESTAMP,
    hours_to_study INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. DEVELOPER JOURNEY TUTORIALS
CREATE TABLE IF NOT EXISTS developer_journey_tutorials (
    id TEXT PRIMARY KEY,
    developer_journey_id TEXT NOT NULL REFERENCES developer_journeys(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT DEFAULT 'article',
    content TEXT,
    position INT DEFAULT 0,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. DEVELOPER JOURNEY TRACKINGS
CREATE TABLE IF NOT EXISTS developer_journey_trackings (
    id TEXT PRIMARY KEY,
    journey_id TEXT NOT NULL REFERENCES developer_journeys(id),
    tutorial_id TEXT NOT NULL REFERENCES developer_journey_tutorials(id),
    developer_id TEXT NOT NULL REFERENCES users(id),
    status INT DEFAULT 0,
    last_viewed TIMESTAMP DEFAULT NOW(),
    first_opened_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 7. DEVELOPER JOURNEY SUBMISSIONS
CREATE TABLE IF NOT EXISTS developer_journey_submissions (
    id TEXT PRIMARY KEY,
    journey_id TEXT NOT NULL REFERENCES developer_journeys(id),
    submitter_id TEXT NOT NULL REFERENCES users(id),
    status TEXT DEFAULT 'submitted',
    rating INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 8. DEVELOPER JOURNEY COMPLETIONS
CREATE TABLE IF NOT EXISTS developer_journey_completions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    journey_id TEXT NOT NULL REFERENCES developer_journeys(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 9. EXAM REGISTRATIONS
CREATE TABLE IF NOT EXISTS exam_registrations (
    id TEXT PRIMARY KEY,
    tutorial_id TEXT REFERENCES developer_journey_tutorials(id),
    examinees_id TEXT NOT NULL REFERENCES users(id),
    status TEXT DEFAULT 'registered',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    exam_finished_at TIMESTAMP
);

-- 10. EXAM RESULTS
CREATE TABLE IF NOT EXISTS exam_results (
    id TEXT PRIMARY KEY,
    exam_registration_id TEXT NOT NULL REFERENCES exam_registrations(id),
    total_questions INT DEFAULT 20,
    score INT NOT NULL,
    is_passed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 11. POMODORO SESSIONS
CREATE TABLE IF NOT EXISTS pomodoro_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    journey_id TEXT REFERENCES developer_journeys(id),
    duration_minutes INT DEFAULT 25,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- INSERT SAMPLE DATA
-- Users
INSERT INTO users (id, name, email, password, user_role, ml_predicted_persona, ml_confidence) VALUES
('9c613fdf-c1fd-4345-b35e-6da2fc398faa', 'Bujang', 'bujang@nexalar.com', '123', 'student', 'fast_learner', 0.85),
('8b512ede-b0ec-3234-a24d-5cb1eb287f99', 'Sarah', 'sarah@nexalar.com', '123', 'student', 'consistent_learner', 0.92),
('7a401dcd-a9db-2123-913c-4ba0da176e88', 'Budi', 'budi@nexalar.com', '123', 'student', 'reflective_learner', 0.78)
ON CONFLICT (email) DO NOTHING;

-- Courses
INSERT INTO developer_journeys (id, name, summary, difficulty, instructor_id, hours_to_study) VALUES
('course-1', 'React Fundamentals', 'Learn React basics', 'beginner', '9c613fdf-c1fd-4345-b35e-6da2fc398faa', 10),
('course-2', 'Node.js Backend', 'Build REST APIs', 'intermediate', '9c613fdf-c1fd-4345-b35e-6da2fc398faa', 15),
('course-3', 'Database Design', 'Master SQL & NoSQL', 'intermediate', '9c613fdf-c1fd-4345-b35e-6da2fc398faa', 12)
ON CONFLICT (id) DO NOTHING;

-- Tutorials
INSERT INTO developer_journey_tutorials (id, developer_journey_id, title, type, position) VALUES
('tut-1', 'course-1', 'Introduction to React', 'article', 1),
('tut-2', 'course-1', 'Components & Props', 'article', 2),
('tut-3', 'course-1', 'State & Lifecycle', 'article', 3),
('tut-4', 'course-2', 'Express Setup', 'article', 1),
('tut-5', 'course-2', 'REST API Design', 'article', 2)
ON CONFLICT (id) DO NOTHING;

-- Notifications
INSERT INTO notifications (id, user_id, title, message, priority, is_read) VALUES
(gen_random_uuid()::text, '9c613fdf-c1fd-4345-b35e-6da2fc398faa', 'Welcome!', 'Start your learning journey today', 'normal', false),
(gen_random_uuid()::text, '9c613fdf-c1fd-4345-b35e-6da2fc398faa', 'Course Completed', 'You finished React Fundamentals!', 'high', false);

-- Weekly Reports
INSERT INTO weekly_reports (user_id, week_number, week_start_date, week_end_date, total_study_time_hours, total_pomodoro_sessions) VALUES
('9c613fdf-c1fd-4345-b35e-6da2fc398faa', 1, CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE, 4.5, 8);

COMMIT;
