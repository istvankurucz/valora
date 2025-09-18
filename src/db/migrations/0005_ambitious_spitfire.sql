PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_group_user` (
	`group_id` text(36) NOT NULL,
	`user_id` text(36) NOT NULL,
	`added_at` text(24) NOT NULL,
	PRIMARY KEY(`group_id`, `user_id`),
	FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_group_user`("group_id", "user_id", "added_at") SELECT "group_id", "user_id", "added_at" FROM `group_user`;--> statement-breakpoint
DROP TABLE `group_user`;--> statement-breakpoint
ALTER TABLE `__new_group_user` RENAME TO `group_user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;