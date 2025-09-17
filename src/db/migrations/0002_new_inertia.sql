PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_transaction` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`label` text NOT NULL,
	`note` text,
	`category_id` text(36) NOT NULL,
	`timestamp` text(24) NOT NULL,
	`amount` real NOT NULL,
	`currency` text(3) NOT NULL,
	`recurring` text,
	`account_id` text(36),
	`user_id` text(36) NOT NULL,
	`group_id` text(36),
	FOREIGN KEY (`category_id`) REFERENCES `transaction_category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_transaction`("id", "type", "label", "note", "category_id", "timestamp", "amount", "currency", "recurring", "account_id", "user_id", "group_id") SELECT "id", "type", "label", "note", "category_id", "timestamp", "amount", "currency", "recurring", "account_id", "user_id", "group_id" FROM `transaction`;--> statement-breakpoint
DROP TABLE `transaction`;--> statement-breakpoint
ALTER TABLE `__new_transaction` RENAME TO `transaction`;--> statement-breakpoint
PRAGMA foreign_keys=ON;