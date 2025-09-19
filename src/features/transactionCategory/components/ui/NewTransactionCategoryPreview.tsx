import Section from "@/src/components/ui/Section/Section";
import ThemedView from "@/src/components/ui/ThemedView";
import generateUUID from "@/src/utils/uuid/generateUUID";
import { useNewTransactionCategory } from "../../contexts/NewTransactionCategoryContext";
import { TransactionCategory } from "../../types/transactionCategoryTypes";
import TransactionCategoryListItem from "./TransactionCategoryListItem";

const NewTransactionCategoryPreview = () => {
	//#region Hooks
	const { data } = useNewTransactionCategory();
	//#endregion

	// #region Constants
	const transactionCategoryData: TransactionCategory = {
		id: generateUUID(),
		type: data.type,
		name: data.name,
		icon: {
			id: generateUUID(),
			name: data.icon,
			foregroundColor: data.foregroundColor,
			backgroundColor: data.backgroundColor,
		},
		transactions: [],
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
	};
	//#endregion

	return (
		<ThemedView>
			<Section.Title>Preview</Section.Title>
			<TransactionCategoryListItem transactionCategory={transactionCategoryData} />
		</ThemedView>
	);
};

export default NewTransactionCategoryPreview;
