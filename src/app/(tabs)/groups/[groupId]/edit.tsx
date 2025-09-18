import Screen from "@/src/components/layout/Screen/Screen";
import { FormValidationProvider } from "@/src/features/form/contexts/FormValidationContext";
import EditGroupForm from "@/src/features/group/components/form/EditGroupForm";
import EditGroupPreview from "@/src/features/group/components/ui/EditGroupPreview";
import { EditGroupProvider } from "@/src/features/group/contexts/EditGroupContext";
import { StyleSheet } from "react-native";

const EditGroup = () => {
	return (
		<EditGroupProvider>
			<Screen>
				<Screen.KeyboardAwareScrollView contentContainerStyle={styles.container}>
					<EditGroupPreview />

					<FormValidationProvider>
						<EditGroupForm />
					</FormValidationProvider>
				</Screen.KeyboardAwareScrollView>
			</Screen>
		</EditGroupProvider>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 32,
	},
});

export default EditGroup;
