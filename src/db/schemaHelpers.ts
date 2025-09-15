import generateUUID from "@/src/utils/uuid/generateUUID";
import { text } from "drizzle-orm/sqlite-core";

// Constants
export const UUID_LENGTH = 36;
export const ISO_DATE_LENGTH = 24;

// ID
export const id = text("id", { length: UUID_LENGTH })
	.primaryKey()
	.$default(() => generateUUID());

// Dates
export const updatedAt = text("updated_at", { length: ISO_DATE_LENGTH })
	.notNull()
	.$default(() => new Date().toISOString())
	.$onUpdate(() => new Date().toISOString());
export const createdAt = text("created_at", { length: ISO_DATE_LENGTH })
	.notNull()
	.$default(() => new Date().toISOString());
