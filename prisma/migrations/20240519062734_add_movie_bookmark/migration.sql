-- CreateTable
CREATE TABLE `MovieBookmark` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `movieId` INTEGER NOT NULL,

    UNIQUE INDEX `MovieBookmark_userId_movieId_key`(`userId`, `movieId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovieBookmark` ADD CONSTRAINT `MovieBookmark_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieBookmark` ADD CONSTRAINT `MovieBookmark_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
