import Screen from "@/src/components/layout/Screen/Screen";
import { FormValidationProvider } from "@/src/features/form/contexts/FormValidationContext";
import EditUserForm from "@/src/features/user/components/form/EditUserForm";

const SettingsEditUser = () => {
	return (
		<Screen>
			<Screen.KeyboardAwareScrollView>
				<FormValidationProvider>
					<EditUserForm />
				</FormValidationProvider>
			</Screen.KeyboardAwareScrollView>
		</Screen>
	);
};

export default SettingsEditUser;
