export const TRANSACTION_RECURRING_OPTIONS = ["daily", "weekly", "monthly", "yearly"] as const;
export type TransactionRecurring = (typeof TRANSACTION_RECURRING_OPTIONS)[number];
