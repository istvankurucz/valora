import { StyleSheet } from "react-native";
import Screen from "../components/layout/Screen/Screen";
import { FormValidationProvider } from "../features/form/contexts/FormValidationContext";
import CreateAccountForm from "../features/user/components/form/CreateAccountForm";
import CreateAccountWelcome from "../features/user/components/layout/CreateAccountWelcome";

const CreateAccount = () => {
	return (
		<Screen hasTabBar={false}>
			<Screen.KeyboardAwareScrollView contentContainerStyle={styles.container}>
				<CreateAccountWelcome />

				<FormValidationProvider>
					<CreateAccountForm />
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
