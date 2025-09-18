import { DEFAULT_GROUP_DATA } from "./defaultGroupData";

// New group
export const NEW_GROUP_FORM_DATA = {
	name: "",
	icon: DEFAULT_GROUP_DATA.icon.name as string,
	foregroundColor: DEFAULT_GROUP_DATA.icon.foregroundColor as string,
	backgroundColor: DEFAULT_GROUP_DATA.icon.backgroundColor as string,
};
export type NewGroupFormData = typeof NEW_GROUP_FORM_DATA;

// Edit group
export const EDIT_GROUP_FORM_DATA = {
	name: "",
	icon: DEFAULT_GROUP_DATA.icon.name as string,
	foregroundColor: DEFAULT_GROUP_DATA.icon.foregroundColor as string,
	backgroundColor: DEFAULT_GROUP_DATA.icon.backgroundColor as string,
};
export type EditGroupFormData = typeof EDIT_GROUP_FORM_DATA;
