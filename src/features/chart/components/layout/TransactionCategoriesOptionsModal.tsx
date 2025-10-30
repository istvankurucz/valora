import Checkbox from "@/src/components/form/Checkbox/Checkbox";
import Label from "@/src/components/form/Label";
import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import Button from "@/src/components/ui/Button";
import Section from "@/src/components/ui/Section/Section";
import { TransactionType } from "@/src/features/transaction/constants/transactionTypeOptions";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useBarChart } from "../../contexts/BarChartContext";
import { useChartModal } from "../../contexts/ChartModalContext";
import { useTransactionCategoriesChart } from "../../contexts/TransactionCategoriesChartContext";

type Props = BottomModalProps;

const TransactionCategoriesOptionsModal = forwardRef<BottomSheetModal, Props>(
	({ modalRef, snapPoints, ...rest }, ref) => {
		// #region Hooks
		const { setSelectedIndex } = useBarChart();
		const { hideModal } = useChartModal();
		const { data, updateData } = useTransactionCategoriesChart();
		//#endregion

		// #region Functions
		function handleTypeCheckboxPress(type: TransactionType) {
			// Get array of new types
			let newTypes: TransactionType[] = [];
			if (data.types.includes(type)) {
				newTypes = data.types.filter((t) => t !== type);
			} else {
				newTypes = [...data.types, type];
			}

			// Update form data
			updateData({ types: newTypes });

			// Reset selected index
			setSelectedIndex(null);
		}
		//#endregion

		return (
			<BottomModal snapPoints={[350]} {...rest} ref={ref}>
				<BottomModalTitle>Chart options</BottomModalTitle>

				<View style={styles.section}>
					<Section.Title>Transaction types</Section.Title>

					<Section style={styles.checkboxContainer}>
						<Pressable
							hitSlop={4}
							style={styles.checkbox}
							onPress={() => handleTypeCheckboxPress("income")}
						>
							<Checkbox value={data.types.includes("income")} />
							<Label>Incomes</Label>
						</Pressable>
						<Pressable
							hitSlop={4}
							style={styles.checkbox}
							onPress={() => handleTypeCheckboxPress("expense")}
						>
							<Checkbox value={data.types.includes("expense")} />
							<Label>Expenses</Label>
						</Pressable>
					</Section>
				</View>

				<Button title="Select options" onPress={hideModal} />
			</BottomModal>
		);
	}
);

// Display name
TransactionCategoriesOptionsModal.displayName = "TransactionCategoriesOptionsModal";

// Styles
const styles = StyleSheet.create({
	section: {
		marginBottom: 24,
	},
	checkboxContainer: {
		gap: 12,
	},
	checkbox: {
		alignSelf: "flex-start",
		flexDirection: "row",
		gap: 8,
	},
});

export default TransactionCategoriesOptionsModal;
