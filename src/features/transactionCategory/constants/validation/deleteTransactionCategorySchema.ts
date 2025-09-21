import { z } from "zod/v4";

export const deleteTransactionCategorySchema = z.union([
	z.object({
		deleteTransactions: z.literal(true),
	}),
	z.object({
		deleteTransactions: z.literal(false),
		newCategoryId: z.uuid("Invalid category Id."),
	}),
]);
export type DeleteTransactionCategoryData = z.infer<typeof deleteTransactionCategorySchema>;
