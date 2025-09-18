import { CurrencyCode } from "@/src/constants/currencies";

// Create account
export const CREATE_ACCOUNT_FORM_DATA = {
	name: "",
	currency: "USD" as CurrencyCode,
	policy: false,
};
export type CreateAccountFormData = typeof CREATE_ACCOUNT_FORM_DATA;
