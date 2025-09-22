import { z } from "zod/v4";

export const editUserSchema = z
	.object({
		name: z.string().trim().nonempty("Name missing."),
	})
	.partial();
export type EditUserData = z.infer<typeof editUserSchema>;
