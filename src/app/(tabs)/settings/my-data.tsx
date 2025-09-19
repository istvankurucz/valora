import Screen from "@/src/components/layout/Screen/Screen";
import { FormValidationProvider } from "@/src/features/form/contexts/FormValidationContext";
import EditAccountForm from "@/src/features/user/components/form/EditAccountForm";

const MyData = () => {
	return (
		<Screen>
			<Screen.KeyboardAwareScrollView>
				<FormValidationProvider>
					<EditAccountForm />
				</FormValidationProvider>
			</Screen.KeyboardAwareScrollView>
		</Screen>
	);
};

export default MyData;
