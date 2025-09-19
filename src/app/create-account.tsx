import { StyleSheet } from "react-native";
import Screen from "../components/layout/Screen/Screen";
import { FormValidationProvider } from "../features/form/contexts/FormValidationContext";
import NewAccountForm from "../features/user/components/form/NewAccountForm";
import CreateAccountWelcome from "../features/user/components/layout/CreateAccountWelcome";

const CreateAccount = () => {
	return (
		<Screen hasHeader={false} hasTabBar={false}>
			<Screen.KeyboardAwareScrollView contentContainerStyle={styles.container}>
				<CreateAccountWelcome />

				<FormValidationProvider>
					<NewAccountForm />
				</FormValidationProvider>
			</Screen.KeyboardAwareScrollView>
		</Screen>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 64,
		paddingTop: 64,
	},
});

export default CreateAccount;
