/*
  Warnings:

  - You are about to drop the column `tmdbId` on the `movies` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `movies_tmdbId_key` ON `movies`;

-- AlterTable
ALTER TABLE `movies` DROP COLUMN `tmdbId`;
