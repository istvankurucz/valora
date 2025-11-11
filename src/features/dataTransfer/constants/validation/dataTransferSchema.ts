import { z } from "zod/v4";
import { TRANSACTION_RECURRING_OPTIONS } from "../../../transaction/constants/transactionRecurringOptions";
import { TRANSACTION_TYPE_OPTIONS } from "../../../transaction/constants/transactionTypeOptions";

// #region Data schemas
const updatedAtSchema = z.iso.datetime("Invalid update date.");
const createdAtSchema = z.iso.datetime("Invalid creation date.");

const userSchema = z.object({
	id: z.uuid("Invalid user ID."),
	name: z.string().trim().nonempty("Invalid user name."),
	admin: z.boolean("Invalid admin flag."),
	updatedAt: updatedAtSchema,
	createdAt: createdAtSchema,
});

const adminPreferencesSchema = z.object({
	id: z.uuid("Invalid admin preferences ID."),
	currency: z.string().length(3, "Invalid currency code."),
	notifications: z.boolean("Invalid notifications flag."),
	userId: z.uuid("Invalid user ID."),
});

const accountSchema = z.object({
	id: z.uuid("Invalid account ID."),
	name: z.string().trim().nonempty("Invalid account name."),
	iconId: z.uuid("Invalid account icon ID."),
	default: z.boolean("Invalid default flag."),
	updatedAt: updatedAtSchema,
	createdAt: createdAtSchema,
});

const transactionSchema = z.object({
	id: z.uuid("Invalid transaction ID."),
	type: z.enum(TRANSACTION_TYPE_OPTIONS, "Invalid transaction type."),
	label: z.string().trim().nonempty("Invalid transaction label."),
	note: z.union([z.string().trim().nonempty("Invalid transaction note."), z.null()]),
	categoryId: z.uuid("Invalid category ID."),
	timestamp: z.iso.datetime("Invalid transaction timestamp."),
	amount: z
		.number("Invalid transaction amount.")
		.nonnegative("Transaction amount cannot be negative."),
	recurring: z.union([
		z.enum(TRANSACTION_RECURRING_OPTIONS, "Invalid transaction recurring option."),
		z.null(),
	]),
	nextTransactionAddedAt: z.union([z.iso.datetime("Invalid next transaction date."), z.null()]),
	accountId: z.union([z.uuid("Invalid account ID."), z.null()]),
	userId: z.uuid("Invalid user ID."),
	groupId: z.union([z.uuid("Invalid group ID."), z.null()]),
});

const transactionCategorySchema = z.object({
	id: z.uuid("Invalid category ID."),
	type: z.enum(TRANSACTION_TYPE_OPTIONS, "Invalid transaction category type."),
	name: z.string().trim().nonempty("Invalid category name."),
	order: z.number("Invalid category order."),
	iconId: z.uuid("Invalid transaction category icon ID."),
	updatedAt: updatedAtSchema,
	createdAt: createdAtSchema,
});

const groupSchema = z.object({
	id: z.uuid("Invalid group ID."),
	name: z.string().trim().nonempty("Invalid group name."),
	iconId: z.uuid("Invalid group icon ID."),
	updatedAt: updatedAtSchema,
	createdAt: createdAtSchema,
});

const groupUserSchema = z.object({
	groupId: z.uuid("Invalid group ID."),
	userId: z.uuid("Invalid user ID."),
	addedAt: z.iso.datetime("Invalid added at date."),
});

const iconSchema = z.object({
	id: z.uuid("Invalid icon ID."),
	name: z.string().trim().nonempty("Invalid icon name."),
	foregroundColor: z
		.string()
		.trim()
		.length(9, "Invalid foreground color.")
		.startsWith("#", "Invalid foreground color."),
	backgroundColor: z
		.string()
		.trim()
		.length(9, "Invalid background color.")
		.startsWith("#", "Invalid background color."),
});
//#endregion

export const dataTransferSchema = z.object({
	data: z.object(
		{
			users: z.array(userSchema, "Invalid users array."),
			adminPreferences: adminPreferencesSchema,
			accounts: z.array(accountSchema, "Invalid accounts array."),
			transactions: z.array(transactionSchema, "Invalid transactions array."),
			transactionCategories: z.array(transactionCategorySchema, "Invalid categories array."),
			groups: z.array(groupSchema, "Invalid groups array."),
			groupUsers: z.array(groupUserSchema, "Invalid group users array."),
			icons: z.array(iconSchema, "Invalid icons array."),
		},
		"Invalid data object."
	),
	metadata: z.object(
		{
			exportedAt: z.iso.datetime(),
		},
		"Invalid metadata object."
	),
});
