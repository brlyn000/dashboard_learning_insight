/*
  Warnings:

  - The primary key for the `developer_journey_completions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avg_submission_rating` on the `developer_journey_completions` table. All the data in the column will be lost.
  - You are about to drop the column `enrolling_times` on the `developer_journey_completions` table. All the data in the column will be lost.
  - You are about to drop the column `study_duration` on the `developer_journey_completions` table. All the data in the column will be lost.
  - The primary key for the `developer_journey_submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `app_comment` on the `developer_journey_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `app_link` on the `developer_journey_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `developer_journey_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `quiz_id` on the `developer_journey_submissions` table. All the data in the column will be lost.
  - You are about to drop the column `reviewer_id` on the `developer_journey_submissions` table. All the data in the column will be lost.
  - The primary key for the `developer_journey_trackings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `status` column on the `developer_journey_trackings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `developer_journey_tutorials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author_id` on the `developer_journey_tutorials` table. All the data in the column will be lost.
  - The primary key for the `developer_journeys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `point` on the `developer_journeys` table. All the data in the column will be lost.
  - You are about to drop the column `required_point` on the `developer_journeys` table. All the data in the column will be lost.
  - You are about to drop the column `required_xp` on the `developer_journeys` table. All the data in the column will be lost.
  - You are about to drop the column `xp` on the `developer_journeys` table. All the data in the column will be lost.
  - The primary key for the `exam_registrations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deadline_at` on the `exam_registrations` table. All the data in the column will be lost.
  - You are about to drop the column `exam_module_id` on the `exam_registrations` table. All the data in the column will be lost.
  - The primary key for the `exam_results` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `look_report_at` on the `exam_results` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `display_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_verification_status` on the `users` table. All the data in the column will be lost.
  - Made the column `user_id` on table `developer_journey_completions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `journey_id` on table `developer_journey_completions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `developer_journey_completions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `developer_journey_completions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `journey_id` on table `developer_journey_submissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `submitter_id` on table `developer_journey_submissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `developer_journey_submissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `developer_journey_submissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `developer_journey_submissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `journey_id` on table `developer_journey_trackings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tutorial_id` on table `developer_journey_trackings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `developer_id` on table `developer_journey_trackings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `developer_journey_id` on table `developer_journey_tutorials` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `developer_journey_tutorials` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `developer_journey_tutorials` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `developer_journey_tutorials` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `developer_journey_tutorials` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `developer_journey_tutorials` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `developer_journey_tutorials` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `developer_journeys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `difficulty` on table `developer_journeys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `developer_journeys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `developer_journeys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `developer_journeys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instructor_id` on table `developer_journeys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `examinees_id` on table `exam_registrations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `exam_registrations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `exam_registrations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `exam_registrations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `exam_registration_id` on table `exam_results` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_questions` on table `exam_results` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score` on table `exam_results` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_passed` on table `exam_results` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `exam_results` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_role` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "developer_journey_completions" DROP CONSTRAINT "developer_journey_completions_journey_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journey_completions" DROP CONSTRAINT "developer_journey_completions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journey_submissions" DROP CONSTRAINT "developer_journey_submissions_journey_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journey_submissions" DROP CONSTRAINT "developer_journey_submissions_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journey_submissions" DROP CONSTRAINT "developer_journey_submissions_reviewer_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journey_submissions" DROP CONSTRAINT "developer_journey_submissions_submitter_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journey_trackings" DROP CONSTRAINT "developer_journey_trackings_developer_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journey_trackings" DROP CONSTRAINT "developer_journey_trackings_journey_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journey_trackings" DROP CONSTRAINT "developer_journey_trackings_tutorial_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journey_tutorials" DROP CONSTRAINT "developer_journey_tutorials_author_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journey_tutorials" DROP CONSTRAINT "developer_journey_tutorials_developer_journey_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journeys" DROP CONSTRAINT "developer_journeys_instructor_id_fkey";

-- DropForeignKey
ALTER TABLE "developer_journeys" DROP CONSTRAINT "developer_journeys_reviewer_id_fkey";

-- DropForeignKey
ALTER TABLE "exam_registrations" DROP CONSTRAINT "exam_registrations_examinees_id_fkey";

-- DropForeignKey
ALTER TABLE "exam_registrations" DROP CONSTRAINT "exam_registrations_tutorial_id_fkey";

-- DropForeignKey
ALTER TABLE "exam_results" DROP CONSTRAINT "exam_results_exam_registration_id_fkey";

-- AlterTable
ALTER TABLE "developer_journey_completions" DROP CONSTRAINT "developer_journey_completions_pkey",
DROP COLUMN "avg_submission_rating",
DROP COLUMN "enrolling_times",
DROP COLUMN "study_duration",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "journey_id" SET NOT NULL,
ALTER COLUMN "journey_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "developer_journey_completions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "developer_journey_completions_id_seq";

-- AlterTable
ALTER TABLE "developer_journey_submissions" DROP CONSTRAINT "developer_journey_submissions_pkey",
DROP COLUMN "app_comment",
DROP COLUMN "app_link",
DROP COLUMN "note",
DROP COLUMN "quiz_id",
DROP COLUMN "reviewer_id",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "journey_id" SET NOT NULL,
ALTER COLUMN "journey_id" SET DATA TYPE TEXT,
ALTER COLUMN "submitter_id" SET NOT NULL,
ALTER COLUMN "submitter_id" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'submitted',
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "developer_journey_submissions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "developer_journey_submissions_id_seq";

-- AlterTable
ALTER TABLE "developer_journey_trackings" DROP CONSTRAINT "developer_journey_trackings_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "journey_id" SET NOT NULL,
ALTER COLUMN "journey_id" SET DATA TYPE TEXT,
ALTER COLUMN "tutorial_id" SET NOT NULL,
ALTER COLUMN "tutorial_id" SET DATA TYPE TEXT,
ALTER COLUMN "developer_id" SET NOT NULL,
ALTER COLUMN "developer_id" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "last_viewed" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "first_opened_at" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "developer_journey_trackings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "developer_journey_trackings_id_seq";

-- AlterTable
ALTER TABLE "developer_journey_tutorials" DROP CONSTRAINT "developer_journey_tutorials_pkey",
DROP COLUMN "author_id",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "developer_journey_id" SET NOT NULL,
ALTER COLUMN "developer_journey_id" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'article',
ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "position" SET DEFAULT 0,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'draft',
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "developer_journey_tutorials_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "developer_journey_tutorials_id_seq";

-- AlterTable
ALTER TABLE "developer_journeys" DROP CONSTRAINT "developer_journeys_pkey",
DROP COLUMN "point",
DROP COLUMN "required_point",
DROP COLUMN "required_xp",
DROP COLUMN "xp",
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "hours_to_study" INTEGER,
ADD COLUMN     "listed" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "difficulty" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'draft',
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "instructor_id" SET NOT NULL,
ALTER COLUMN "instructor_id" SET DATA TYPE TEXT,
ALTER COLUMN "reviewer_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "developer_journeys_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "developer_journeys_id_seq";

-- AlterTable
ALTER TABLE "exam_registrations" DROP CONSTRAINT "exam_registrations_pkey",
DROP COLUMN "deadline_at",
DROP COLUMN "exam_module_id",
ADD COLUMN     "exam_finished_at" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "tutorial_id" SET DATA TYPE TEXT,
ALTER COLUMN "examinees_id" SET NOT NULL,
ALTER COLUMN "examinees_id" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'registered',
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "exam_registrations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "exam_registrations_id_seq";

-- AlterTable
ALTER TABLE "exam_results" DROP CONSTRAINT "exam_results_pkey",
DROP COLUMN "look_report_at",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "exam_registration_id" SET NOT NULL,
ALTER COLUMN "exam_registration_id" SET DATA TYPE TEXT,
ALTER COLUMN "total_questions" SET NOT NULL,
ALTER COLUMN "total_questions" SET DEFAULT 20,
ALTER COLUMN "score" SET NOT NULL,
ALTER COLUMN "is_passed" SET NOT NULL,
ALTER COLUMN "is_passed" SET DEFAULT false,
ALTER COLUMN "created_at" SET NOT NULL,
ADD CONSTRAINT "exam_results_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "exam_results_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "city",
DROP COLUMN "display_name",
DROP COLUMN "phone",
DROP COLUMN "user_verification_status",
ADD COLUMN     "ai_persona" JSONB,
ADD COLUMN     "image_path" TEXT,
ADD COLUMN     "learning_categories" JSONB,
ADD COLUMN     "learning_recommendation" TEXT,
ADD COLUMN     "ml_confidence" DOUBLE PRECISION,
ADD COLUMN     "ml_last_prediction_at" TIMESTAMPTZ(6),
ADD COLUMN     "ml_predicted_persona" TEXT,
ADD COLUMN     "personalized_insight" TEXT,
ADD COLUMN     "pomodoro_config" JSONB,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "user_role" SET NOT NULL,
ALTER COLUMN "user_role" SET DEFAULT 'student',
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "weekly_reports" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "week_number" INTEGER NOT NULL,
    "week_start_date" DATE NOT NULL,
    "week_end_date" DATE NOT NULL,
    "total_study_time_hours" DOUBLE PRECISION DEFAULT 0,
    "total_pomodoro_sessions" INTEGER DEFAULT 0,
    "avg_session_duration" DOUBLE PRECISION DEFAULT 0,
    "total_activities" INTEGER DEFAULT 0,
    "engagement_score" DOUBLE PRECISION DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weekly_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "weekly_reports" ADD CONSTRAINT "weekly_reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journeys" ADD CONSTRAINT "developer_journeys_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journeys" ADD CONSTRAINT "developer_journeys_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_tutorials" ADD CONSTRAINT "developer_journey_tutorials_developer_journey_id_fkey" FOREIGN KEY ("developer_journey_id") REFERENCES "developer_journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_trackings" ADD CONSTRAINT "developer_journey_trackings_journey_id_fkey" FOREIGN KEY ("journey_id") REFERENCES "developer_journeys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_trackings" ADD CONSTRAINT "developer_journey_trackings_tutorial_id_fkey" FOREIGN KEY ("tutorial_id") REFERENCES "developer_journey_tutorials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_trackings" ADD CONSTRAINT "developer_journey_trackings_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_submissions" ADD CONSTRAINT "developer_journey_submissions_journey_id_fkey" FOREIGN KEY ("journey_id") REFERENCES "developer_journeys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_submissions" ADD CONSTRAINT "developer_journey_submissions_submitter_id_fkey" FOREIGN KEY ("submitter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_completions" ADD CONSTRAINT "developer_journey_completions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer_journey_completions" ADD CONSTRAINT "developer_journey_completions_journey_id_fkey" FOREIGN KEY ("journey_id") REFERENCES "developer_journeys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_registrations" ADD CONSTRAINT "exam_registrations_tutorial_id_fkey" FOREIGN KEY ("tutorial_id") REFERENCES "developer_journey_tutorials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_registrations" ADD CONSTRAINT "exam_registrations_examinees_id_fkey" FOREIGN KEY ("examinees_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_results" ADD CONSTRAINT "exam_results_exam_registration_id_fkey" FOREIGN KEY ("exam_registration_id") REFERENCES "exam_registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
