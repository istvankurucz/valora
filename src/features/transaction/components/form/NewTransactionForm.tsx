import FormDateInput from "@/src/components/form/DateInput/FormDateInput";
import FormInput from "@/src/components/form/Input/FormInput";
import PriceInput from "@/src/components/form/Input/PriceInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import FormSegmentedControl from "@/src/components/form/SegmentedControl/FormSegmentedControl";
import FormSelect from "@/src/components/form/Select/FormSelect";
import Button from "@/src/components/ui/Button";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import useCreateTransaction from "../../hooks/useCreateTransaction";
import useNewTransactionData from "../../hooks/useNewTransactionData";
import { Transaction } from "../../types/transactionTypes";
import validateNewTransactionData from "../../utils/validation/validateNewTransactionData";
import LatestTransactionOption from "../ui/LatestTransactionOption";

const NewTransactionForm = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	const {
		data,
		updateData,
		handleMemberChange,
		resetFormData,
		TRANSACTION_CATEGORY_TYPE_OPTIONS,
		latestTransactions,
		CATEGORY_OPTIONS,
		RECURRING_OPTIONS,
		ACCOUNT_OPTIONS,
		GROUP_OPTIONS,
		MEMBER_OPTIONS,
		lastPathname,
	} = useNewTransactionData();
	const { createTransaction, loading } = useCreateTransaction();
	const { addError, removeErrors } = useFormValidation();
	const router = useRouter();
	//#endregion

	// #region Functions
	function handleLatestTransactionPress(transaction: Transaction) {
		updateData({
			amount: transaction.amount.toString(),
			label: transaction.label,
			categoryId: transaction.category.id,
			accountId: transaction.account?.id ?? "",
			groupId: transaction.group?.id ?? "",
			userId: transaction.user.id,
			recurring: transaction.recurring ?? "",
			note: transaction.note ?? "",
		});
	}

	async function handleCreateTransactionPress() {
		// Remove form errors
		removeErrors();

		try {
			// Validation
			const transactionData = validateNewTransactionData({
				type: data.type,
				label: data.label,
				note: data.note || undefined,
				categoryId: data.categoryId,
				timestamp: data.timestamp.toISOString(),
				amount: parseFloat(data.amount),
				recurring: data.recurring || undefined,
				accountId: data.accountId || undefined,
				userId: data.userId,
				groupId: data.groupId || undefined,
			});

			// Create transaction
			await createTransaction(transactionData);

			// Navigation
			router.replace(lastPathname as any);

			// Reset form data
			resetFormData();
		} catch (err) {
			console.log(err);
			addError(err);
		}
	}
	//#endregion

	return (
		<View>
			<InputsContainer>
				<FormSegmentedControl
					shade={200}
					field="type"
					label="Transaction type"
					options={TRANSACTION_CATEGORY_TYPE_OPTIONS}
					value={data.type}
					onValueChange={(type) => updateData({ type })}
				/>
				<PriceInput
					field="amount"
					type={data.type}
					placeholder="0"
					value={data.amount}
					onChangeText={(amount) => updateData({ amount })}
				/>
				<FormInput
					field="label"
					label="Label"
					placeholder="Label"
					value={data.label}
					onChangeText={(label) => updateData({ label })}
				/>
				{latestTransactions.length > 0 && (
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.latestTransactionsContainer}
					>
						{latestTransactions.map((transaction) => (
							<LatestTransactionOption
								key={transaction.id}
								transaction={transaction}
								onPress={() => handleLatestTransactionPress(transaction)}
							/>
						))}
					</ScrollView>
				)}
				<FormDateInput
					field="timestamp"
					label="Date"
					title="Select trasnsaction date"
					date={data.timestamp}
					onValueChange={(timestamp) => updateData({ timestamp })}
				/>
				<FormSelect
					field="categoryId"
					label="Category"
					options={CATEGORY_OPTIONS}
					value={data.categoryId}
					onValueChange={(categoryId) => updateData({ categoryId })}
				/>
				<FormSelect
					field="accountId"
					label="Account"
					disabled={data.userId !== admin?.id}
					options={ACCOUNT_OPTIONS}
					value={data.accountId}
					onValueChange={(accountId) => updateData({ accountId })}
				/>
				<FormSelect
					field="groupId"
					label="Group"
					options={GROUP_OPTIONS}
					value={data.groupId}
					onValueChange={(groupId) => updateData({ groupId })}
				/>
				{data.groupId && (
					<FormSelect
						field="userId"
						label="Member"
						options={MEMBER_OPTIONS}
						value={data.userId}
						onValueChange={handleMemberChange}
					/>
				)}
				<FormSelect
					field="recurring"
					label="Recurring"
					options={RECURRING_OPTIONS}
					value={data.recurring}
					onValueChange={(recurring) => updateData({ recurring })}
				/>
				<FormInput
					field="note"
					label="Note"
					placeholder="Note"
					multiline
					value={data.note}
					onChangeText={(note) => updateData({ note })}
				/>
			</InputsContainer>

			<Button
				title="Create transaction"
				loading={loading}
				onPress={handleCreateTransactionPress}
			/>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	latestTransactionsContainer: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 8,
	},
});

export default NewTransactionForm;
