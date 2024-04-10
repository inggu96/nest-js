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
