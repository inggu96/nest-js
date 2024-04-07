/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `author`,
    ADD COLUMN `birth` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` LONGTEXT NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NULL,
    ADD COLUMN `isLikeView` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `isPreferenceView` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `isPublic` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `isReviewView` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `nickname` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `profileImage` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userType` ENUM('ADMIN', 'USER') NULL DEFAULT 'USER',
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
