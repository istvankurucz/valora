import Section from "@/src/components/ui/Section/Section";
import { Pressable } from "react-native";
import { useChartModal } from "../../../chart/contexts/ChartModalContext";

const TransactionCategoriesChartHeader = () => {
	// #region Hooks
	const { showModal } = useChartModal();
	//#endregion

	return (
		<Section.Header>
			<Section.Title>Transactions by category</Section.Title>
			<Pressable onPress={showModal}>
				<Section.Header.Link>Options</Section.Header.Link>
			</Pressable>
		</Section.Header>
	);
};

export default TransactionCategoriesChartHeader;
