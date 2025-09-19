import { z } from "zod/v4";
import { TRANSACTION_TYPE_OPTIONS } from "../transactionTypeOptions";

export const transactionTypeSchema = z.union(
	TRANSACTION_TYPE_OPTIONS.map((option) => z.literal(option), "Invalid transaction type.")
);
