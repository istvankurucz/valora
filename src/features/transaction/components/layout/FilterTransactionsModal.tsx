import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { StyleSheet } from "react-native";
import { useFilterTransactions } from "../../contexts/FilterTransactionsContext";
import FilterTransactionsForm from "../form/FilterTransactionsForm";

type Props = BottomModalProps;

const FilterTransactionsModal = forwardRef<BottomSheetModal, Props>(
	({ snapPoints, enableContentPanningGesture, style, ...rest }, ref) => {
		// #region Hooks
		const { transactions, setFilteredTransactions, setFilterCount, data, updateData } =
			useFilterTransactions();
		//#endregion

		return (
			<BottomModal
				snapPoints={["80%"]}
				enableContentPanningGesture={false}
				style={styles.container}
				{...rest}
				ref={ref}
			>
				<BottomModalTitle>Filter and sort transactions</BottomModalTitle>

				<FilterTransactionsForm
					transactions={transactions}
					setTransactions={setFilteredTransactions}
					setFilterCount={setFilterCount}
					data={data}
					updateData={updateData}
				/>
			</BottomModal>
		);
	}
);

// Display name
FilterTransactionsModal.displayName = "FilterTransactionsModal";

// Styles
const styles = StyleSheet.create({
	container: {
		paddingBottom: 96 * 2 + 32,
	},
});

export default FilterTransactionsModal;
