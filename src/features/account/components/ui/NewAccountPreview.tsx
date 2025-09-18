import SectionTitle from "@/src/components/ui/SectionTitle";
import ThemedView from "@/src/components/ui/ThemedView";
import generateUUID from "@/src/utils/uuid/generateUUID";
import { useNewAccount } from "../../contexts/NewAccountContext";
import { Account } from "../../types/accountTypes";
import AccountListItem from "./AccountListItem";

const NewAccountPreview = () => {
	//#region Hooks
	const { data } = useNewAccount();
	//#endregion

	// #region Constants
	const accountData: Account = {
		id: generateUUID(),
		name: data.name,
		icon: {
			id: generateUUID(),
			name: data.icon,
			foregroundColor: data.foregroundColor,
			backgroundColor: data.backgroundColor,
		},
		default: false,
		transactions: [],
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
	};
	//#endregion

	return (
		<ThemedView>
			<SectionTitle>Preview</SectionTitle>
			<AccountListItem account={accountData} />
		</ThemedView>
	);
};

export default NewAccountPreview;
