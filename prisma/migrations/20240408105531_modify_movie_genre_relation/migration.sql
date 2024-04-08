-- CreateTable
CREATE TABLE `movies` (
    `id` INTEGER NOT NULL,
    `adult` BOOLEAN NOT NULL,
    `backdrop_path` VARCHAR(191) NULL,
    `original_language` VARCHAR(191) NOT NULL,
    `original_title` VARCHAR(191) NOT NULL,
    `overview` VARCHAR(191) NOT NULL,
    `popularity` DOUBLE NOT NULL,
    `poster_path` VARCHAR(191) NOT NULL,
    `release_date` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `video` BOOLEAN NOT NULL,
    `vote_average` DOUBLE NOT NULL,
    `vote_count` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MovieToGenre` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MovieToGenre_AB_unique`(`A`, `B`),
    INDEX `_MovieToGenre_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MovieToGenre` ADD CONSTRAINT `_MovieToGenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MovieToGenre` ADD CONSTRAINT `_MovieToGenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
