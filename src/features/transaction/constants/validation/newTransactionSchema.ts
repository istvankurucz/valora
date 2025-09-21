import { INITIAL_DATE } from "@/src/constants/initialDate";
import { z } from "zod/v4";
import { transactionRecurringSchema } from "./transactionRecurringSchema";
import { transactionTypeSchema } from "./transactionTypeSchema";

export const newTransactionSchema = z
	.object({
		type: transactionTypeSchema,
		label: z.string().trim().nonempty("Label missing."),
		note: z.string().trim().nonempty("Note missing.").optional(),
		categoryId: z.uuid("Category missing."),
		timestamp: z.iso.datetime("Invalid timestamp"),
		amount: z.number("Amount missing.").min(0, "Amount cannot be negative."),
		recurring: transactionRecurringSchema,
		accountId: z.uuid("Account missing.").optional(),
		userId: z.uuid("User missing."),
		groupId: z.uuid("Group missing.").optional(),
	})
	.check((ctx) => {
		// Get timestamp
		const { timestamp } = ctx.value;

		// Check initial data
		if (new Date(timestamp) === INITIAL_DATE) {
			ctx.issues.push({
				code: "invalid_value",
				input: timestamp,
				path: ["timestamp"],
				message: "Date missing.",
				values: [],
			});
		}

		// Check future date
		if (new Date(timestamp) > new Date()) {
			ctx.issues.push({
				code: "invalid_value",
				input: timestamp,
				path: ["timestamp"],
				message: "Date cannot be future.",
				values: [],
			});
		}
	});
export type NewTransactionData = z.infer<typeof newTransactionSchema>;
