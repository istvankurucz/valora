import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import Section from "@/src/components/ui/Section/Section";
import ThemedText from "@/src/components/ui/ThemedText";
import ThemedView from "@/src/components/ui/ThemedView";
import Tooltip from "@/src/components/ui/Tooltip";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import useThemeColor from "@/src/hooks/useThemeColor";
import capitalizeString from "@/src/utils/string/capitalizeString";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useMonthlyTransactionsStats } from "../../contexts/MonthlyTransactionsStatsContext";
import getTopExpenseCategory from "../../utils/getTopExpenseCategory";
import TransactionAmount from "../ui/TransactionAmount";

const ICON_SIZE = 20;

type Props = BottomModalProps;

const MonthlyTransactionsStatsModal = forwardRef<BottomSheetModal, Props>(
	({ snapPoints, ...rest }, ref) => {
		// #region States
		const [showBalanceTooltip, setShowBalanceTooltip] = useState(false);
		const [showTopExpenseCategoryTooltip, setShowTopExpenseCategoryTooltip] = useState(false);
		//#endregion

		// #region Hooks
		const { transactionsSectionData } = useMonthlyTransactionsStats();

		const incomeIconColor = useThemeColor({ variant: "success", shade: 500 });
		const expenseIconColor = useThemeColor({ variant: "danger", shade: 500 });
		const boxBorderColor = useThemeColor({ variant: "neutral", shade: 300 });
		const defaultIconColor = useThemeColor({ variant: "neutral", shade: 800 });
		//#endregion

		// #region Constants
		const totalIncome = transactionsSectionData?.income ?? 0;
		const totalExpense = transactionsSectionData?.expense ?? 0;
		const netBalance = totalIncome - totalExpense;
		const netBalanceType = netBalance >= 0 ? "income" : "expense";
		const transactionsCount = transactionsSectionData?.data.length ?? 0;
		const topExpenseCategory = getTopExpenseCategory(transactionsSectionData?.data ?? []);
		//#endregion

		// #region Functions
		function handleBalanceTooltipPress() {
			setShowBalanceTooltip((show) => !show);
		}
		function handleTopExpenseCategoryTooltipPress() {
			setShowTopExpenseCategoryTooltip((show) => !show);
		}
		//#endregion

		return (
			<BottomModal snapPoints={[500]} {...rest} ref={ref}>
				<BottomModalTitle>{transactionsSectionData?.title}</BottomModalTitle>

				<View style={styles.sections}>
					<View>
						<Section.Title>Balance</Section.Title>

						<View style={styles.boxContainerV}>
							<View style={styles.boxContainerH}>
								<ThemedView variant="success" shade={100} style={styles.box}>
									<Ionicons
										name="arrow-up-circle-outline"
										size={ICON_SIZE}
										color={incomeIconColor}
									/>

									<TransactionAmount
										amount={totalIncome}
										transactionType="income"
										style={styles.boxText}
									/>
								</ThemedView>
								<ThemedView variant="danger" shade={100} style={styles.box}>
									<Ionicons
										name="arrow-down-circle-outline"
										size={ICON_SIZE}
										color={expenseIconColor}
									/>

									<TransactionAmount
										amount={totalExpense}
										transactionType="expense"
										style={styles.boxText}
									/>
								</ThemedView>
							</View>

							<Pressable onPress={handleBalanceTooltipPress}>
								<Tooltip text="Balance" show={showBalanceTooltip} />

								<ThemedView
									style={[styles.box, styles.boxBorder, { borderColor: boxBorderColor }]}
								>
									<Ionicons
										name="swap-vertical-outline"
										size={ICON_SIZE}
										color={
											netBalanceType === "income" ? incomeIconColor : expenseIconColor
										}
									/>

									<TransactionAmount
										amount={netBalance}
										transactionType={netBalanceType}
										style={styles.boxText}
									/>
								</ThemedView>
							</Pressable>
						</View>
					</View>

					<View>
						<Section.Title>Transactions</Section.Title>

						<View style={styles.boxContainerV}>
							<View style={styles.boxContainerH}>
								<ThemedView
									style={[styles.box, styles.boxBorder, { borderColor: boxBorderColor }]}
								>
									<Ionicons
										name="stats-chart-outline"
										size={ICON_SIZE}
										color={defaultIconColor}
									/>

									<ThemedText style={styles.boxText}>
										{transactionsCount} transaction{transactionsCount !== 1 ? "s" : ""}
									</ThemedText>
								</ThemedView>

								{topExpenseCategory && (
									<Pressable
										style={{ minWidth: "50%" }}
										onPress={handleTopExpenseCategoryTooltipPress}
									>
										<Tooltip
											text="Top expense category"
											show={showTopExpenseCategoryTooltip}
										/>

										<ThemedView
											style={[
												styles.box,
												styles.boxBorder,
												{ borderColor: boxBorderColor },
											]}
										>
											<Ionicons
												name={topExpenseCategory.icon.name as any}
												size={ICON_SIZE}
												color={topExpenseCategory.icon.foregroundColor}
											/>

											<ThemedText style={styles.boxText}>
												{capitalizeString(topExpenseCategory.name)}
											</ThemedText>
										</ThemedView>
									</Pressable>
								)}
							</View>
						</View>
					</View>
				</View>
			</BottomModal>
		);
	}
);

// Display name
MonthlyTransactionsStatsModal.displayName = "MonthlyTransactionsStatsModal";

// Styles
const styles = StyleSheet.create({
	sections: {
		gap: 32,
	},
	boxContainer: {
		flex: 1,
	},
	box: {
		flex: 1,
		flexDirection: "row",
		gap: 12,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: BORDER_RADIUS[500],
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	boxBorder: {
		borderWidth: 1.5,
	},
	boxText: {
		marginBottom: -4,
	},
	amount: {
		marginBottom: -4,
	},
	boxContainerV: {
		gap: 8,
	},
	boxContainerH: {
		flexDirection: "row",
		gap: 8,
	},
});

export default MonthlyTransactionsStatsModal;
