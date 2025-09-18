import { z } from "zod/v4";

export const newGroupSchema = z.object({
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
});
export type NewGroupData = z.infer<typeof newGroupSchema>;
