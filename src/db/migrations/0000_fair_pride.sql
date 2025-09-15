CREATE TABLE `account` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`updated_at` text(24) NOT NULL,
	`created_at` text(24) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `group` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`updated_at` text(24) NOT NULL,
	`created_at` text(24) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `group_user` (
	`group_id` text(36) NOT NULL,
	`user_id` text(36) NOT NULL,
	PRIMARY KEY(`group_id`, `user_id`),
	FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`label` text NOT NULL,
	`note` text,
	`category_id` text(36) NOT NULL,
	`timestamp` text(24) NOT NULL,
	`amount` real NOT NULL,
	`currency` text(3) NOT NULL,
	`recurring` text,
	`account_id` text(36) NOT NULL,
	`user_id` text(36) NOT NULL,
	`group_id` text(36),
	FOREIGN KEY (`category_id`) REFERENCES `transaction_category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transaction_category` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`icon` text NOT NULL,
	`foreground_color` text NOT NULL,
	`background_color` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`admin` integer NOT NULL,
	`updated_at` text(24) NOT NULL,
	`created_at` text(24) NOT NULL
);
