import { z } from "zod/v4";
import { currencySchema } from "./currencySchema";

export const editAccountSchema = z
	.object({
		name: z.string().trim().nonempty("Name missing."),
		currency: currencySchema,
	})
	.partial();
export type EditAccountData = z.infer<typeof editAccountSchema>;
