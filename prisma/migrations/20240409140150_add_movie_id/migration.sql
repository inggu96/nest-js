/*
  Warnings:

  - A unique constraint covering the columns `[tmdbId]` on the table `movies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `movies` ALTER COLUMN `tmdbId` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `movies_tmdbId_key` ON `movies`(`tmdbId`);
