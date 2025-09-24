import FormDateInput from "@/src/components/form/DateInput/FormDateInput";
import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import FormSegmentedControl from "@/src/components/form/SegmentedControl/FormSegmentedControl";
import FormSelect from "@/src/components/form/Select/FormSelect";
import Button from "@/src/components/ui/Button";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import { useLastPathname } from "@/src/features/navigation/contexts/LastPathnameContext";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import { useRouter } from "expo-router";
import { View } from "react-native";
import useEditTransactionData from "../../hooks/useEditTransactionData";
import useUpdateTransaction from "../../hooks/useUpdateTransaction";
import validateEditTransactionData from "../../utils/validation/validateEditTransactionData";

const EditTransactionForm = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	const {
		transaction,
		data,
		updateData,
		handleMemberChange,
		resetFormData,
		TRANSACTION_CATEGORY_TYPE_OPTIONS,
		CATEGORY_OPTIONS,
		RECURRING_OPTIONS,
		ACCOUNT_OPTIONS,
		GROUP_OPTIONS,
		MEMBER_OPTIONS,
	} = useEditTransactionData();
	const { updateTransaction, loading } = useUpdateTransaction();
	const { addError, removeErrors } = useFormValidation();
	const router = useRouter();
	const { pathname } = useLastPathname();
	//#endregion

	// #region Functions
	async function handleUpdateTransactionPress() {
		// Check transaction
		if (!transaction) return;

		// Remove form errors
		removeErrors();

		try {
			// Validation
			const transactionData = validateEditTransactionData({
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
			await updateTransaction({ id: transaction.id, data: transactionData });

			// Navigation
			router.replace(pathname as any);

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
				<FormInput
					field="label"
					label="Label"
					placeholder="Label"
					value={data.label}
					onChangeText={(label) => updateData({ label })}
				/>
				<FormInput
					field="amount"
					label="Amount"
					placeholder="Amount"
					keyboardType="decimal-pad"
					value={data.amount}
					onChangeText={(amount) => updateData({ amount })}
				/>
				<FormSelect
					field="categoryId"
					label="Category"
					options={CATEGORY_OPTIONS}
					value={data.categoryId}
					onValueChange={(categoryId) => updateData({ categoryId })}
				/>
				<FormDateInput
					field="timestamp"
					label="Date"
					value={data.timestamp}
					onValueChange={(timestamp) => updateData({ timestamp })}
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
					label="Recurring transactions"
					options={RECURRING_OPTIONS}
					value={data.recurring}
					onValueChange={(recurring) => updateData({ recurring })}
				/>
				<FormInput
					field="note"
					label="Note (optional)"
					placeholder="Note"
					multiline
					value={data.note}
					onChangeText={(note) => updateData({ note })}
				/>
			</InputsContainer>

			<Button
				title="Update transaction"
				loading={loading}
				onPress={handleUpdateTransactionPress}
			/>
		</View>
	);
};

export default EditTransactionForm;
