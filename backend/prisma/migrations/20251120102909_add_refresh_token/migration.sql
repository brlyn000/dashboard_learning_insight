-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "display_name" TEXT,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "user_role" TEXT,
    "user_verification_status" BOOLEAN,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "city" TEXT,
    "refresh_token" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developer_journeys" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "summary" TEXT,
    "point" INTEGER,
    "required_point" INTEGER,
    "xp" INTEGER,
    "required_xp" INTEGER,
    "difficulty" TEXT,
    "status" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "instructor_id" INTEGER,
    "reviewer_id" INTEGER,

    CONSTRAINT "developer_journeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developer_journey_tutorials" (
    "id" SERIAL NOT NULL,
    "developer_journey_id" INTEGER,
    "title" TEXT,
    "type" TEXT,
    "content" TEXT,
    "position" INTEGER,
    "status" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "author_id" INTEGER,

    CONSTRAINT "developer_journey_tutorials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developer_journey_trackings" (
    "id" SERIAL NOT NULL,
    "journey_id" INTEGER,
    "tutorial_id" INTEGER,
    "developer_id" INTEGER,
    "status" TEXT,
    "last_viewed" TIMESTAMP(3),
    "first_opened_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "developer_journey_trackings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developer_journey_submissions" (
    "id" SERIAL NOT NULL,
    "journey_id" INTEGER,
    "quiz_id" INTEGER,
    "submitter_id" INTEGER,
    "app_link" TEXT,
    "app_comment" TEXT,
    "status" TEXT,
    "reviewer_id" INTEGER,
    "rating" INTEGER,
    "note" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "developer_journey_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developer_journey_completions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "journey_id" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "enrolling_times" INTEGER,
    "study_duration" INTEGER,
    "avg_submission_rating" DOUBLE PRECISION,

    CONSTRAINT "developer_journey_completions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_registrations" (
    "id" SERIAL NOT NULL,
    "exam_module_id" INTEGER,
    "tutorial_id" INTEGER,
    "examinees_id" INTEGER,
    "status" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deadline_at" TIMESTAMP(3),

    CONSTRAINT "exam_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_results" (
    "id" SERIAL NOT NULL,
    "exam_registration_id" INTEGER,
    "total_questions" INTEGER,
    "score" INTEGER,
    "is_passed" BOOLEAN,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "look_report_at" TIMESTAMP(3),

    CONSTRAINT "exam_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "developer_journeys" ADD CONSTRAINT "developer_journeys_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journeys" ADD CONSTRAINT "developer_journeys_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_tutorials" ADD CONSTRAINT "developer_journey_tutorials_developer_journey_id_fkey" FOREIGN KEY ("developer_journey_id") REFERENCES "developer_journeys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_tutorials" ADD CONSTRAINT "developer_journey_tutorials_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_trackings" ADD CONSTRAINT "developer_journey_trackings_journey_id_fkey" FOREIGN KEY ("journey_id") REFERENCES "developer_journeys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_trackings" ADD CONSTRAINT "developer_journey_trackings_tutorial_id_fkey" FOREIGN KEY ("tutorial_id") REFERENCES "developer_journey_tutorials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_trackings" ADD CONSTRAINT "developer_journey_trackings_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_submissions" ADD CONSTRAINT "developer_journey_submissions_journey_id_fkey" FOREIGN KEY ("journey_id") REFERENCES "developer_journeys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_submissions" ADD CONSTRAINT "developer_journey_submissions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "developer_journey_tutorials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_submissions" ADD CONSTRAINT "developer_journey_submissions_submitter_id_fkey" FOREIGN KEY ("submitter_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_submissions" ADD CONSTRAINT "developer_journey_submissions_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_completions" ADD CONSTRAINT "developer_journey_completions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_completions" ADD CONSTRAINT "developer_journey_completions_journey_id_fkey" FOREIGN KEY ("journey_id") REFERENCES "developer_journeys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_registrations" ADD CONSTRAINT "exam_registrations_tutorial_id_fkey" FOREIGN KEY ("tutorial_id") REFERENCES "developer_journey_tutorials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_registrations" ADD CONSTRAINT "exam_registrations_examinees_id_fkey" FOREIGN KEY ("examinees_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_results" ADD CONSTRAINT "exam_results_exam_registration_id_fkey" FOREIGN KEY ("exam_registration_id") REFERENCES "exam_registrations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
