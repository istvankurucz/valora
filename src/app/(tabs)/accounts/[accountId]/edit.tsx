import Screen from "@/src/components/layout/Screen/Screen";
import EditAccountForm from "@/src/features/account/components/form/EditAccountForm";
import EditAccountPreview from "@/src/features/account/components/ui/EditAccountPreview";
import { EditAccountProvider } from "@/src/features/account/contexts/EditAccountContext";
import { FormValidationProvider } from "@/src/features/form/contexts/FormValidationContext";
import { StyleSheet } from "react-native";

const EditAccount = () => {
	return (
		<EditAccountProvider>
			<Screen>
				<Screen.KeyboardAwareScrollView contentContainerStyle={styles.container}>
					<EditAccountPreview />

					<FormValidationProvider>
						<EditAccountForm />
					</FormValidationProvider>
				</Screen.KeyboardAwareScrollView>
			</Screen>
		</EditAccountProvider>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 32,
	},
});

export default EditAccount;
