import { INITIAL_DATE } from "@/src/constants/initialDate";
import { z } from "zod/v4";
import { transactionRecurringSchema } from "./transactionRecurringSchema";
import { transactionTypeSchema } from "./transactionTypeSchema";

export const editTransactionSchema = z
	.object({
		type: transactionTypeSchema,
		label: z.string().trim().nonempty("Label missing."),
		note: z.union([z.string().trim().nonempty("Note missing."), z.null()]).optional(),
		categoryId: z.uuid("Category missing."),
		timestamp: z.iso.datetime("Invalid timestamp"),
		amount: z.number("Amount missing.").min(0, "Amount cannot be negative."),
		recurring: transactionRecurringSchema,
		accountId: z.union([z.uuid("Account missing."), z.null()]).optional(),
		userId: z.uuid("User missing."),
		groupId: z.union([z.uuid("Group missing."), z.null()]).optional(),
	})
	.partial()
	.check((ctx) => {
		// Get timestamp
		const { timestamp } = ctx.value;

		// Check initial data
		if (timestamp && new Date(timestamp) === INITIAL_DATE) {
			ctx.issues.push({
				code: "invalid_value",
				input: timestamp,
				path: ["timestamp"],
				message: "Date missing.",
				values: [],
			});
		}

		// Check future date
		if (timestamp && new Date(timestamp) > new Date()) {
			ctx.issues.push({
				code: "invalid_value",
				input: timestamp,
				path: ["timestamp"],
				message: "Date cannot be future.",
				values: [],
			});
		}
	});
export type EditTransactionData = z.infer<typeof editTransactionSchema>;
