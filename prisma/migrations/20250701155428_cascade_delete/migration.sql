-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_gigId_fkey`;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_gigId_fkey` FOREIGN KEY (`gigId`) REFERENCES `Gig`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
