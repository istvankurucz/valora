import Section from "@/src/components/ui/Section/Section";
import { SectionHeaderProps } from "@/src/components/ui/Section/SectionHeader/SectionHeader";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { TransactionType } from "../../constants/transactionTypeOptions";
import { useMonthlyTransactionsStats } from "../../contexts/MonthlyTransactionsStatsContext";
import { TransactionsSectionData } from "../../types/transactionTypes";
import TransactionAmount from "./TransactionAmount";

const FLIP_DURATION = 500;

type Props = SectionHeaderProps & {
	// section: Omit<TransactionsSectionData, "data">;
	section: TransactionsSectionData;
	showByDefault?: TransactionType;
	showAnimation?: boolean;
};

const TransactionsSectionHeader = ({
	section,
	showByDefault = "expense",
	showAnimation = true,
}: Props) => {
	// #region States
	const [showIncome, setShowIncome] = useState(showByDefault === "income");
	//#endregion

	// #region Hooks
	const { setTransactionsSectionData, showModal } = useMonthlyTransactionsStats();

	const translateY = useSharedValue(0);
	const visibleRotateX = useSharedValue("0deg");
	const hiddenRotateX = useSharedValue("-90deg");

	const setAnimatedValues = useCallback(() => {
		translateY.set(withTiming(showIncome ? -32 : 0, { duration: FLIP_DURATION }));
		visibleRotateX.set(withTiming(showIncome ? "90deg" : "0deg", { duration: FLIP_DURATION }));
		hiddenRotateX.set(withTiming(showIncome ? "0deg" : "-90deg", { duration: FLIP_DURATION }));
	}, [showIncome, translateY, visibleRotateX, hiddenRotateX]);

	useEffect(() => {
		// Initial set of animated values
		setAnimatedValues();

		if (!showAnimation) return;

		// Set interval to toggle between income and expense
		const interval = setInterval(() => {
			// Set animated values
			setAnimatedValues();

			// Toggle state
			setShowIncome((show) => !show);
		}, 5000);

		return () => clearInterval(interval);
	}, [showAnimation, setAnimatedValues]);

	const visibleAmountStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotateX: visibleRotateX.get() }, { translateY: translateY.get() }],
		};
	});
	const hiddenAmountStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotateX: hiddenRotateX.get() }, { translateY: translateY.get() + 32 }],
		};
	});
	//#endregion

	// #region Functions
	function handleAmountPress() {
		if (!showAnimation) return;

		// Toggle visible amount
		setShowIncome((show) => !show);
	}

	async function handleAmountLongPress() {
		// Add haptic feedback
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

		// Set data in context
		setTransactionsSectionData(section);

		// Show modal
		showModal();
	}
	//#endregion

	return (
		<Section.Header style={styles.header}>
			<Section.Title>{section.title}</Section.Title>

			<Pressable
				style={styles.amountContainer}
				hitSlop={4}
				onPress={handleAmountPress}
				onLongPress={handleAmountLongPress}
			>
				<Animated.View style={[styles.amount, visibleAmountStyle]}>
					<TransactionAmount amount={section.expense} transactionType="expense" />
				</Animated.View>
				<Animated.View style={[styles.amount, hiddenAmountStyle]}>
					<TransactionAmount amount={section.income} transactionType="income" />
				</Animated.View>
			</Pressable>
		</Section.Header>
	);
};

// Styles
const styles = StyleSheet.create({
	header: {
		marginTop: 8,
		marginBottom: -8,
	},
	amountContainer: {
		minWidth: 100,
	},
	amount: {
		position: "absolute",
		top: -16,
		right: 0,
	},
});

export default TransactionsSectionHeader;
