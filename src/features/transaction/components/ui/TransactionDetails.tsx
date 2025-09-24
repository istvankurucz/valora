import IconBox from "@/src/components/ui/IconBox";
import ListItem from "@/src/components/ui/ListItem/ListItem";
import Section from "@/src/components/ui/Section/Section";
import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import UserIcon from "@/src/features/user/components/ui/UserIcon";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import useFormatAmount from "@/src/features/user/hooks/useFormatAmount";
import formatRelativeDate from "@/src/utils/format/formatRelativeDate";
import { Link } from "expo-router";
import { StyleSheet, View, ViewProps } from "react-native";
import { Transaction } from "../../types/transactionTypes";
import TransactionSectionHeader from "../layout/TransactionSectionHeader";

type Props = ViewProps & {
	transaction: Transaction | null;
};

const TransactionDetails = ({ transaction }: Props) => {
	// #region Hooks
	const { admin } = useAdminUser();
	const { formatAmount } = useFormatAmount();
	//#endregion

	// #region Constants
	const amountVariant =
		transaction?.amount !== 0
			? transaction?.type === "income"
				? "success"
				: "danger"
			: "neutral";
	const amountSign = transaction?.amount !== 0 ? (transaction?.type === "income" ? "+" : "-") : "";
	const adminTransaction = admin?.id === transaction?.user.id;
	//#endregion

	if (!transaction) return null;
	return (
		<Section style={styles.container}>
			<View style={styles.header}>
				<IconBox icon={transaction.category.icon} />
				<View style={styles.headerRight}>
					<ThemedText fontFamily="Poppins_600SemiBold" style={styles.label}>
						{transaction.label}
					</ThemedText>
					<ThemedText shade={500}>
						{formatRelativeDate(new Date(transaction.timestamp))}
					</ThemedText>
				</View>
			</View>
			<View>
				<ThemedText
					variant={amountVariant}
					shade={500}
					fontFamily="Poppins_700Bold"
					style={styles.amountText}
				>
					{amountSign}
					{formatAmount(transaction.amount)}
				</ThemedText>
			</View>
			{transaction.account && (
				<Section shade={200}>
					<TransactionSectionHeader icon="card-outline" title="Account" />

					<Link href={`/accounts/${transaction.account.id}`} asChild>
						<ListItem>
							<ListItem.Icon
								icon={{ ...transaction.account.icon, size: 24 }}
								style={styles.itemIcon}
							/>
							<ListItem.Main>
								<ListItem.Label fontFamily="Poppins_400Regular" style={styles.itemLabel}>
									{transaction.account.name}
								</ListItem.Label>
							</ListItem.Main>
							<ListItem.More />
						</ListItem>
					</Link>
				</Section>
			)}
			{transaction.group && (
				<Section shade={200}>
					<TransactionSectionHeader icon="card-outline" title="Group" />

					<View style={styles.groupContainer}>
						<Link href={`/groups/${transaction.group.id}`} asChild>
							<ListItem>
								<ListItem.Icon
									icon={{ ...transaction.group.icon, size: 24 }}
									style={styles.itemIcon}
								/>
								<ListItem.Main>
									<ListItem.Label fontFamily="Poppins_400Regular" style={styles.itemLabel}>
										{transaction.group.name}
									</ListItem.Label>
								</ListItem.Main>
								<ListItem.More />
							</ListItem>
						</Link>

						{!adminTransaction && (
							<View>
								<TransactionSectionHeader
									icon="person-outline"
									title="Member"
									style={styles.memberHeader}
								/>

								<Link
									href={`/groups/${transaction.group.id}/members/${transaction.user.id}`}
									asChild
								>
									<ListItem>
										<UserIcon />
										<ListItem.Main>
											<ListItem.Label
												fontFamily="Poppins_400Regular"
												style={styles.itemLabel}
											>
												{transaction.user.name}
											</ListItem.Label>
										</ListItem.Main>
										<ListItem.More />
									</ListItem>
								</Link>
							</View>
						)}
					</View>
				</Section>
			)}

			<Section shade={200}>
				<TransactionSectionHeader icon="create-outline" title="Note" />

				{transaction.note && <ThemedText shade={600}>{transaction.note}</ThemedText>}
				{!transaction.note && (
					<ThemedText
						shade={500}
						fontFamily="Poppins_300Light_Italic"
						style={styles.noteMissing}
					>
						No note
					</ThemedText>
				)}
			</Section>
		</Section>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 24,
	},
	header: {
		flexDirection: "row",
		gap: 24,
	},
	label: {
		fontSize: FONT_SIZE[600],
	},
	headerRight: {
		gap: 4,
	},
	amountText: {
		textAlign: "right",
		fontSize: FONT_SIZE[700],
		paddingHorizontal: 16,
	},
	underlay: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginHorizontal: -16,
	},
	itemIcon: {
		width: 48,
		height: 48,
	},
	itemLabel: {
		fontSize: FONT_SIZE[500],
	},
	groupContainer: {
		gap: 12,
	},
	memberHeader: {
		marginBottom: 4,
	},
	noteMissing: {
		fontSize: FONT_SIZE[400],
	},
});

export default TransactionDetails;
