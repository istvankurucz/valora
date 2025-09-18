import { CURRENCY_CODES } from "@/src/constants/currencies";
import { z } from "zod/v4";

export const currencySchema = z.union(
	CURRENCY_CODES.map((code) => z.literal(code)),
	"Invalid currency."
);
