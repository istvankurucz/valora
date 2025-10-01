import Button from "@/src/components/ui/Button";
import Section from "@/src/components/ui/Section/Section";
import ThemedText from "@/src/components/ui/ThemedText";
import IconUnderlay from "@/src/components/ui/Underlay/IconUnderlay";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import useGetRecurringTransactions from "../../hooks/useGetRecurringTransactions";
import groupRecurringTransactions from "../../utils/groupRecurringTransactions";

const RecurringTransactions = () => {
	// #region States
	const [show, setShow] = useState(true);
	//#endregion

	// #region Hooks
	const { transactions } = useGetRecurringTransactions();

	const iconColor = useThemeColor({ variant: "neutral", shade: 600 });
	//#endregion

	// #region Constants
	const groupedTransactions = useMemo(
		() => groupRecurringTransactions(transactions),
		[transactions]
	);
	//#endregion

	// #region Functions
	function handleClosePress() {
		setShow(false);
	}
	//#endregion

	if (!show) return null;
	if (groupedTransactions.today.length === 0 && groupedTransactions.past.length === 0) return null;
	return (
		<View>
			<Section.Title>Recurring transactions</Section.Title>
			<Section variant="neutral" shade={300} style={styles.section}>
				<View>
					<ThemedText>You have:</ThemedText>

					<View style={styles.list}>
						{groupedTransactions.today.length > 0 && (
							<ThemedText>
								<ThemedText fontFamily="Poppins_600SemiBold">
									{groupedTransactions.today.length}
								</ThemedText>{" "}
								transaction{groupedTransactions.today.length !== 1 ? "s" : ""} due today
							</ThemedText>
						)}
						{groupedTransactions.past.length > 0 && (
							<ThemedText>
								<ThemedText fontFamily="Poppins_600SemiBold">
									{groupedTransactions.past.length}
								</ThemedText>{" "}
								transaction{groupedTransactions.past.length !== 1 ? "s" : ""} past due
							</ThemedText>
						)}
					</View>

					<Link href="/settings/recurring-transactions" asChild>
						<Button title="View all" style={styles.button} />
					</Link>
				</View>

				<IconUnderlay style={styles.icon} onPress={handleClosePress}>
					<Ionicons name="close" size={16} color={iconColor} />
				</IconUnderlay>
			</Section>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	section: {
		flexDirection: "row",
		gap: 8,
		justifyContent: "space-between",
	},
	list: {
		marginTop: 8,
		marginLeft: 8,
		marginBottom: 16,
	},
	button: {
		alignSelf: "flex-start",
	},
	icon: {
		alignSelf: "flex-start",
		marginTop: -8,
		marginRight: -8,
	},
});

export default RecurringTransactions;
