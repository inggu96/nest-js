/*
  Warnings:

  - You are about to drop the column `description` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isLikeView` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isPreferenceView` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isReviewView` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `description`,
    DROP COLUMN `isLikeView`,
    DROP COLUMN `isPreferenceView`,
    DROP COLUMN `isPublic`,
    DROP COLUMN `isReviewView`,
    DROP COLUMN `profileImage`;
