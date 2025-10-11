import FullIconInput from "@/src/components/form/IconInput/FullIconInput";
import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import FormSegmentedControl from "@/src/components/form/SegmentedControl/FormSegmentedControl";
import Button from "@/src/components/ui/Button";
import Section from "@/src/components/ui/Section/Section";
import ThemedView from "@/src/components/ui/ThemedView";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useUpdateIcon from "@/src/features/icon/hooks/useUpdateIcon";
import {
	TRANSACTION_TYPE_OPTIONS,
	TransactionType,
} from "@/src/features/transaction/constants/transactionTypeOptions";
import { SegmentedControlOption } from "@/src/types/uiTypes";
import formatHexColor from "@/src/utils/color/formatHexColor";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { useEditTransactionCategory } from "../../contexts/EditTransactionCategoryContext";
import { useTransactionCategory } from "../../contexts/TransactionCategoryContext";
import useUpdateTransactionCategory from "../../hooks/useUpdateTransactionCategory";
import validateEditTransactionCategoryData from "../../utils/validation/validateEditTransactionCategoryData";

const EditTransactionCategoryForm = () => {
	// #region Hooks
	const { transactionCategory } = useTransactionCategory();
	const { data, updateData } = useEditTransactionCategory();
	const { updateIcon, loading: loadingUpdateIcon } = useUpdateIcon();
	const { updateTransactionCategory, loading: loadingUpdateTransactionCategory } =
		useUpdateTransactionCategory();
	const { addError, removeErrors } = useFormValidation();
	const router = useRouter();
	//#endregion

	// #region Constants
	const TRANSACTION_CATEGORY_TYPE_OPTIONS: SegmentedControlOption<TransactionType>[] = useMemo(
		() =>
			TRANSACTION_TYPE_OPTIONS.map((option) => ({
				value: option,
				label: capitalizeString(option),
			})),
		[]
	);

	const loading = loadingUpdateIcon || loadingUpdateTransactionCategory;
	//#endregion

	// #region Functions
	async function handleUpdateTransactionCategoryPress() {
		// Check transaction category
		if (!transactionCategory) return;

		// Remove form errors
		removeErrors();

		try {
			// Validation
			const { type, name, icon, foregroundColor, backgroundColor } =
				validateEditTransactionCategoryData({
					type: data.type,
					name: data.name,
					icon: data.icon,
					foregroundColor: formatHexColor(data.foregroundColor),
					backgroundColor: formatHexColor(data.backgroundColor),
				});

			// Create account
			await updateIcon({
				id: transactionCategory.icon.id,
				data: { name: icon, foregroundColor, backgroundColor },
			});
			await updateTransactionCategory({
				id: transactionCategory.id,
				data: { type, name },
			});

			// Navigate
			router.dismissTo(`/settings/transaction-categories/${transactionCategory.id}`);
		} catch (err) {
			console.log(err);
			addError(err);
		}
	}
	//#endregion

	return (
		<ThemedView>
			<Section.Title>Category data</Section.Title>

			<InputsContainer>
				<FullIconInput
					icon={data.icon}
					onIconChange={(icon) => updateData({ icon })}
					foregroundColor={data.foregroundColor}
					onForegroundColorChange={(foregroundColor) => updateData({ foregroundColor })}
					backgroundColor={data.backgroundColor}
					onBackgroundColorChange={(backgroundColor) => updateData({ backgroundColor })}
				/>
				<FormSegmentedControl
					field="type"
					label="Type"
					shade={200}
					options={TRANSACTION_CATEGORY_TYPE_OPTIONS}
					value={data.type}
					onValueChange={(type) => updateData({ type })}
				/>
				<FormInput
					field="name"
					label="Category name"
					placeholder="Category name"
					value={data.name}
					onChangeText={(name) => updateData({ name })}
				/>
			</InputsContainer>

			<Button
				title="Update category"
				loading={loading}
				onPress={handleUpdateTransactionCategoryPress}
			/>
		</ThemedView>
	);
};

export default EditTransactionCategoryForm;
