import Section from "@/src/components/ui/Section/Section";
import ThemedView from "@/src/components/ui/ThemedView";
import generateUUID from "@/src/utils/uuid/generateUUID";
import { useAccount } from "../../contexts/AccountContext";
import { useEditAccount } from "../../contexts/EditAccountContext";
import { Account } from "../../types/accountTypes";
import AccountListItem from "./AccountListItem";

const EditAccountPreview = () => {
	//#region Hooks
	const { account } = useAccount();
	const { data } = useEditAccount();
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
		transactions: account?.transactions ?? [],
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
	};
	//#endregion

	return (
		<ThemedView>
			<Section.Title>Preview</Section.Title>
			<AccountListItem account={accountData} />
		</ThemedView>
	);
};

export default EditAccountPreview;
