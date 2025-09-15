import { z } from "zod/v4";

export const createAccountSchema = z.object({
	name: z.string().trim().nonempty("Name missing."),
});
export type CreateAccountData = z.infer<typeof createAccountSchema>;
