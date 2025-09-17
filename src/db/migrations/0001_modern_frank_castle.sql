CREATE TABLE `icon` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`foreground_color` text(9) NOT NULL,
	`background_color` text(9) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `account` ADD `icon_id` text(36) NOT NULL REFERENCES icon(id);--> statement-breakpoint
ALTER TABLE `group` ADD `icon_id` text(36) NOT NULL REFERENCES icon(id);--> statement-breakpoint
ALTER TABLE `transaction_category` ADD `icon_id` text(36) NOT NULL REFERENCES icon(id);--> statement-breakpoint
ALTER TABLE `transaction_category` DROP COLUMN `icon`;--> statement-breakpoint
ALTER TABLE `transaction_category` DROP COLUMN `foreground_color`;--> statement-breakpoint
ALTER TABLE `transaction_category` DROP COLUMN `background_color`;