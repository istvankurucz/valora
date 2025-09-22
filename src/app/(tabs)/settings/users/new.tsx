import Screen from "@/src/components/layout/Screen/Screen";
import { FormValidationProvider } from "@/src/features/form/contexts/FormValidationContext";
import NewUserForm from "@/src/features/user/components/form/NewUserForm";

const SettingsNewMember = () => {
	return (
		<Screen>
			<Screen.KeyboardAwareScrollView>
				<FormValidationProvider>
					<NewUserForm />
				</FormValidationProvider>
			</Screen.KeyboardAwareScrollView>
		</Screen>
	);
};

export default SettingsNewMember;
