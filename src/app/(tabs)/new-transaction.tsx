import Screen from "@/src/components/layout/Screen/Screen";
import { FormValidationProvider } from "@/src/features/form/contexts/FormValidationContext";
import NewTransactionForm from "@/src/features/transaction/components/form/NewTransactionForm";

const NewTransaction = () => {
	return (
		<Screen>
			<Screen.KeyboardAwareScrollView>
				<FormValidationProvider>
					<NewTransactionForm />
				</FormValidationProvider>
			</Screen.KeyboardAwareScrollView>
		</Screen>
	);
};

export default NewTransaction;
