import { z } from "zod/v4";

export const createAccountSchema = z.object({
	name: z.string().trim().nonempty("Name missing."),
	policy: z.literal(true, "Ploicy is not agreed."),
});
export type CreateAccountData = z.infer<typeof createAccountSchema>;
