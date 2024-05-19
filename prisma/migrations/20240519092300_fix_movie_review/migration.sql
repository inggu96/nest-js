/*
  Warnings:

  - Added the required column `content` to the `ReviewComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReviewComment` ADD COLUMN `content` VARCHAR(191) NOT NULL;
