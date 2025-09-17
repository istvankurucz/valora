import Screen from "@/src/components/layout/Screen/Screen";
import NewAccountForm from "@/src/features/account/components/form/NewAccountForm";
import NewAccountPreview from "@/src/features/account/components/ui/NewAccountPreview";
import { NewAccountProvider } from "@/src/features/account/contexts/NewAccountContext";
import { FormValidationProvider } from "@/src/features/form/contexts/FormValidationContext";
import { StyleSheet } from "react-native";

const NewAccount = () => {
	return (
		<NewAccountProvider>
			<Screen>
				<Screen.KeyboardAwareScrollView contentContainerStyle={styles.container}>
					<NewAccountPreview />

					<FormValidationProvider>
						<NewAccountForm />
					</FormValidationProvider>
				</Screen.KeyboardAwareScrollView>
			</Screen>
		</NewAccountProvider>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 32,
	},
});

export default NewAccount;
