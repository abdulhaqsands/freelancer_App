-- DropForeignKey
ALTER TABLE `gig` DROP FOREIGN KEY `Gig_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Gig` ADD CONSTRAINT `Gig_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
