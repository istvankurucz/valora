export const TRANSACTION_TYPE_OPTIONS = ["income", "expense"] as const;
export type TransactionType = (typeof TRANSACTION_TYPE_OPTIONS)[number];
