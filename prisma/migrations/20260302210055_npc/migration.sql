-- CreateTable
CREATE TABLE `Npc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,
    `gender` ENUM('male', 'female', 'other') NOT NULL,
    `hairColor` VARCHAR(191) NOT NULL,
    `skinColor` VARCHAR(191) NOT NULL,
    `hairOption` ENUM('none', 'bald', 'buzzCut', 'quiff', 'bobCut', 'shortStraight', 'longStraight', 'shortWavy', 'longWavy', 'shortCurly', 'longCurly', 'afro', 'ponytail', 'braids', 'dreadlocks', 'mohawk') NOT NULL,
    `selectedCategory` ENUM('creation', 'production', 'supplies', 'defense', 'commerce') NOT NULL,
    `approvalStatus` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NpcRejection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `npcId` INTEGER NOT NULL,
    `reason` TEXT NOT NULL,
    `rejectedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `NpcRejection_userId_idx`(`userId`),
    INDEX `NpcRejection_npcId_idx`(`npcId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Npc` ADD CONSTRAINT `Npc_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NpcRejection` ADD CONSTRAINT `NpcRejection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NpcRejection` ADD CONSTRAINT `NpcRejection_npcId_fkey` FOREIGN KEY (`npcId`) REFERENCES `Npc`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
