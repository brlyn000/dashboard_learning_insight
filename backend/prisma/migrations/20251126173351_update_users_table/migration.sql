/*
  Warnings:

  - You are about to drop the column `ama` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `city_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `custom_city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image_path` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone_verification_status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone_verified_with` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `remember_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tz` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `unsubscribe_link` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verified_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verified_certificate_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verified_identity_document` on the `users` table. All the data in the column will be lost.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "ama",
DROP COLUMN "city_id",
DROP COLUMN "custom_city",
DROP COLUMN "deleted_at",
DROP COLUMN "image_path",
DROP COLUMN "phone_verification_status",
DROP COLUMN "phone_verified_with",
DROP COLUMN "remember_token",
DROP COLUMN "tz",
DROP COLUMN "unsubscribe_link",
DROP COLUMN "verified_at",
DROP COLUMN "verified_certificate_name",
DROP COLUMN "verified_identity_document",
ALTER COLUMN "password" SET NOT NULL;
