import { transactionTypeSchema } from "@/src/features/transaction/constants/validation/transactionTypeSchema";
import { z } from "zod/v4";

export const editTransactionCategorySchema = z
	.object({
		type: transactionTypeSchema,
		name: z.string().trim().nonempty("Name missing."),
		icon: z.string().trim().nonempty("Icon missing."),
		foregroundColor: z
			.string()
			.trim()
			.nonempty("Icon color missing.")
			.length(9, "Invalid hex color value."),
		backgroundColor: z
			.string()
			.trim()
			.nonempty("Background color missing.")
			.length(9, "Invalid hex color value."),
	})
	.partial();
export type EditTransactionCategoryData = z.infer<typeof editTransactionCategorySchema>;
