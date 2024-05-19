-- CreateTable
CREATE TABLE `MovieLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `movieId` INTEGER NOT NULL,

    UNIQUE INDEX `MovieLike_userId_movieId_key`(`userId`, `movieId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovieLike` ADD CONSTRAINT `MovieLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieLike` ADD CONSTRAINT `MovieLike_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
