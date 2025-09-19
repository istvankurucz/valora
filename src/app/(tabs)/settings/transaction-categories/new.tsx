import Screen from "@/src/components/layout/Screen/Screen";
import { FormValidationProvider } from "@/src/features/form/contexts/FormValidationContext";
import NewTransactionCategoryForm from "@/src/features/transactionCategory/components/form/NewTransactionCategoryForm";
import NewTransactionCategoryPreview from "@/src/features/transactionCategory/components/ui/NewTransactionCategoryPreview";
import { NewTransactionCategoryProvider } from "@/src/features/transactionCategory/contexts/NewTransactionCategoryContext";
import { StyleSheet } from "react-native";

const NewTransactionCategory = () => {
	return (
		<NewTransactionCategoryProvider>
			<Screen>
				<Screen.KeyboardAwareScrollView contentContainerStyle={styles.container}>
					<NewTransactionCategoryPreview />

					<FormValidationProvider>
						<NewTransactionCategoryForm />
					</FormValidationProvider>
				</Screen.KeyboardAwareScrollView>
			</Screen>
		</NewTransactionCategoryProvider>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 32,
	},
});

export default NewTransactionCategory;
