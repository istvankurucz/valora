import Section from "@/src/components/ui/Section/Section";
import { Pressable } from "react-native";
import { useTransactionCategoriesChart } from "../../contexts/TransactionCategoriesChartContext";

const TransactionCategoriesChartHeader = () => {
	// #region Hooks
	const { showOptionsModal } = useTransactionCategoriesChart();
	//#endregion

	// #region Functions
	function handleOptionsPress() {
		showOptionsModal();
	}
	//#endregion

	return (
		<Section.Header>
			<Section.Title>Transactions by category</Section.Title>
			<Pressable onPress={handleOptionsPress}>
				<Section.Header.Link>Options</Section.Header.Link>
			</Pressable>
		</Section.Header>
	);
};

export default TransactionCategoriesChartHeader;
