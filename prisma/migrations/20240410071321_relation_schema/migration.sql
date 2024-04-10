/*
  Warnings:

  - A unique constraint covering the columns `[tmdbId]` on the table `movies` will be added. If there are existing duplicate values, this will fail.
  - Made the column `tmdbId` on table `movies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Genre` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `movies` MODIFY `tmdbId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `MovieToGenre` (
    `movieId` INTEGER NOT NULL,
    `genreId` INTEGER NOT NULL,

    PRIMARY KEY (`movieId`, `genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `movies_tmdbId_key` ON `movies`(`tmdbId`);

-- AddForeignKey
ALTER TABLE `MovieToGenre` ADD CONSTRAINT `MovieToGenre_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieToGenre` ADD CONSTRAINT `MovieToGenre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
