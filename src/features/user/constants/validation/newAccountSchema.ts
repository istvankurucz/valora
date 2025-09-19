import { z } from "zod/v4";
import { currencySchema } from "./currencySchema";

export const newAccountSchema = z.object({
	name: z.string().trim().nonempty("Name missing."),
	currency: currencySchema,
	policy: z.literal(true, "Ploicy is not agreed."),
});
export type NewAccountData = z.infer<typeof newAccountSchema>;
