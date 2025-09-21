import { z } from "zod/v4";
import { TRANSACTION_RECURRING_OPTIONS } from "../transactionRecurringOptions";

export const transactionRecurringSchema = z
	.union(TRANSACTION_RECURRING_OPTIONS.map((option) => z.literal(option)))
	.optional();
