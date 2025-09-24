import Screen from "@/src/components/layout/Screen/Screen";
import { FormValidationProvider } from "@/src/features/form/contexts/FormValidationContext";
import EditTransactionForm from "@/src/features/transaction/components/form/EditTransactionForm";

const EditTransaction = () => {
	return (
		<Screen>
			<Screen.KeyboardAwareScrollView>
				<FormValidationProvider>
					<EditTransactionForm />
				</FormValidationProvider>
			</Screen.KeyboardAwareScrollView>
		</Screen>
	);
};

export default EditTransaction;
