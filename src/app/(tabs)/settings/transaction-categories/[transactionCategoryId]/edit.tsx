import Screen from "@/src/components/layout/Screen/Screen";
import { FormValidationProvider } from "@/src/features/form/contexts/FormValidationContext";
import EditTransactionCategoryForm from "@/src/features/transactionCategory/components/form/EditTransactionCategoryForm";
import EditTransactionCategoryPreview from "@/src/features/transactionCategory/components/ui/EditTransactionCategoryPreview";
import { EditTransactionCategoryProvider } from "@/src/features/transactionCategory/contexts/EditTransactionCategoryContext";
import { StyleSheet } from "react-native";

const EditTransactionCategory = () => {
	return (
		<EditTransactionCategoryProvider>
			<Screen>
				<Screen.KeyboardAwareScrollView contentContainerStyle={styles.container}>
					<EditTransactionCategoryPreview />

					<FormValidationProvider>
						<EditTransactionCategoryForm />
					</FormValidationProvider>
				</Screen.KeyboardAwareScrollView>
			</Screen>
		</EditTransactionCategoryProvider>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 32,
	},
});

export default EditTransactionCategory;
