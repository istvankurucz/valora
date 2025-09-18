ALTER TABLE `account` ADD `default` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `currency` text(3);--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `currency`;