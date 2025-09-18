import { z } from "zod/v4";

export const newAccountSchema = z.object({
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
	default: z.boolean(),
});
export type NewAccountData = z.infer<typeof newAccountSchema>;
