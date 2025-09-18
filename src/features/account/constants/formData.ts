import { DEFAULT_ACCOUNT_DATA } from "./defaultAccountData";

// New account
export const NEW_ACCOUNT_FORM_DATA = {
	name: "",
	icon: DEFAULT_ACCOUNT_DATA.icon.name as string,
	foregroundColor: DEFAULT_ACCOUNT_DATA.icon.foregroundColor as string,
	backgroundColor: DEFAULT_ACCOUNT_DATA.icon.backgroundColor as string,
	default: false,
};
export type NewAccountFormData = typeof NEW_ACCOUNT_FORM_DATA;

// Edit account
export const EDIT_ACCOUNT_FORM_DATA = {
	name: "",
	icon: DEFAULT_ACCOUNT_DATA.icon.name as string,
	foregroundColor: DEFAULT_ACCOUNT_DATA.icon.foregroundColor as string,
	backgroundColor: DEFAULT_ACCOUNT_DATA.icon.backgroundColor as string,
	default: false,
};
export type EditAccountFormData = typeof EDIT_ACCOUNT_FORM_DATA;
