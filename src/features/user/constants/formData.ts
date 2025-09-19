import { CurrencyCode } from "@/src/constants/currencies";

// New account
export const NEW_ACCOUNT_FORM_DATA = {
	name: "",
	currency: "USD" as CurrencyCode,
	policy: false,
};
export type NewAccountFormData = typeof NEW_ACCOUNT_FORM_DATA;

// Edit account
export const EDIT_ACCOUNT_FORM_DATA = {
	name: "",
	currency: "USD" as CurrencyCode,
};
export type EditAccountFormData = typeof EDIT_ACCOUNT_FORM_DATA;
