CREATE TABLE `admin_preferences` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`currency` text(3) NOT NULL,
	`notifications` integer DEFAULT true NOT NULL,
	`user_id` text(36) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `currency`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `notifications`;