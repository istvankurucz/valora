import { CURRENCIES } from "@/src/constants/currencies";
import { z } from "zod/v4";

export const currencySchema = z.union(
	CURRENCIES.map((currency) => z.literal(currency.code)),
	"Invalid currency."
);
