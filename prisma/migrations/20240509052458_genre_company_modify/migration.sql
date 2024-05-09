/*
  Warnings:

  - You are about to drop the `MovieGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovieProductionCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MovieGenre` DROP FOREIGN KEY `MovieGenre_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `MovieGenre` DROP FOREIGN KEY `MovieGenre_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `MovieProductionCompany` DROP FOREIGN KEY `MovieProductionCompany_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `MovieProductionCompany` DROP FOREIGN KEY `MovieProductionCompany_productionCompanyId_fkey`;

-- DropTable
DROP TABLE `MovieGenre`;

-- DropTable
DROP TABLE `MovieProductionCompany`;

-- CreateTable
CREATE TABLE `MovieGenres` (
    `movieId` INTEGER NOT NULL,
    `genreId` INTEGER NOT NULL,

    PRIMARY KEY (`movieId`, `genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieProductionCompanies` (
    `movieId` INTEGER NOT NULL,
    `productionCompanyId` INTEGER NOT NULL,

    PRIMARY KEY (`movieId`, `productionCompanyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovieGenres` ADD CONSTRAINT `MovieGenres_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieGenres` ADD CONSTRAINT `MovieGenres_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieProductionCompanies` ADD CONSTRAINT `MovieProductionCompanies_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieProductionCompanies` ADD CONSTRAINT `MovieProductionCompanies_productionCompanyId_fkey` FOREIGN KEY (`productionCompanyId`) REFERENCES `ProductionCompany`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
