import FullIconInput from "@/src/components/form/IconInput/FullIconInput";
import FormInput from "@/src/components/form/Input/FormInput";
import InputsContainer from "@/src/components/form/InputsContainer";
import FormSegmentedControl from "@/src/components/form/SegmentedControl/FormSegmentedControl";
import Button from "@/src/components/ui/Button";
import Section from "@/src/components/ui/Section/Section";
import ThemedView from "@/src/components/ui/ThemedView";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import useCreateIcon from "@/src/features/icon/hooks/useCreateIcon";
import {
	TRANSACTION_TYPE_OPTIONS,
	TransactionType,
} from "@/src/features/transaction/constants/transactionTypeOptions";
import { SegmentedControlOption } from "@/src/types/uiTypes";
import formatHexColor from "@/src/utils/color/formatHexColor";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { useNewTransactionCategory } from "../../contexts/NewTransactionCategoryContext";
import useCreateTransactionCategory from "../../hooks/useCreateTransactionCategory";
import validateNewTransactionCategoryData from "../../utils/validation/validateNewTransactionCategoryData";

const NewTransactionCategoryForm = () => {
	// #region Hooks
	const { data, updateData } = useNewTransactionCategory();
	const { createIcon, loading: loadingCreateIcon } = useCreateIcon();
	const { createTransactionCategory, loading: loadingCreateTransactionCategory } =
		useCreateTransactionCategory();
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

	const loading = loadingCreateIcon || loadingCreateTransactionCategory;
	//#endregion

	// #region Functions
	async function handleCreateTransactionCategoryPress() {
		// Remove form errors
		removeErrors();

		try {
			// Validation
			const { type, name, icon, foregroundColor, backgroundColor } =
				validateNewTransactionCategoryData({
					type: data.type,
					name: data.name,
					icon: data.icon,
					foregroundColor: formatHexColor(data.foregroundColor),
					backgroundColor: formatHexColor(data.backgroundColor),
				});

			// Create account
			const createdIcon = await createIcon({ name: icon, foregroundColor, backgroundColor });
			const category = await createTransactionCategory({
				type,
				name,
				iconId: createdIcon.id,
			});

			// Navigate
			router.dismissTo(`/settings/transaction-categories/${category.id}`);
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
				title="Create category"
				loading={loading}
				onPress={handleCreateTransactionCategoryPress}
			/>
		</ThemedView>
	);
};

export default NewTransactionCategoryForm;
