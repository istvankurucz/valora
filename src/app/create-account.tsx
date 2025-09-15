import Screen from "../components/layout/Screen";
import { FormValidationProvider } from "../features/form/contexts/FormValidationContext";
import CreateAccountForm from "../features/user/components/form/CreateAccountForm";

const CreateAccount = () => {
	return (
		<Screen hasTabBar={false}>
			<FormValidationProvider>
				<CreateAccountForm />
			</FormValidationProvider>
		</Screen>
	);
};

export default CreateAccount;
