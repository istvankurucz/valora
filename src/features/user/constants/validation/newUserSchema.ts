import { z } from "zod/v4";

export const newUserSchema = z.object({
	name: z.string().trim().nonempty("Name missing."),
});
export type NewUserData = z.infer<typeof newUserSchema>;
