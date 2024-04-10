/*
  Warnings:

  - You are about to drop the `_MovieToGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_MovieToGenre` DROP FOREIGN KEY `_MovieToGenre_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MovieToGenre` DROP FOREIGN KEY `_MovieToGenre_B_fkey`;

-- AlterTable
ALTER TABLE `movies` ADD COLUMN `tmdbId` INTEGER NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- DropTable
DROP TABLE `_MovieToGenre`;
