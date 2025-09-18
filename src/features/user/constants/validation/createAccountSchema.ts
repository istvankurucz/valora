import { z } from "zod/v4";
import { currencySchema } from "./currencySchema";

export const createAccountSchema = z.object({
	name: z.string().trim().nonempty("Name missing."),
	currency: currencySchema,
	policy: z.literal(true, "Ploicy is not agreed."),
});
export type CreateAccountData = z.infer<typeof createAccountSchema>;
