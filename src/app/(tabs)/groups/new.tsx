import Screen from "@/src/components/layout/Screen/Screen";
import { FormValidationProvider } from "@/src/features/form/contexts/FormValidationContext";
import NewGroupForm from "@/src/features/group/components/form/NewGroupForm";
import NewGroupPreview from "@/src/features/group/components/ui/NewGroupPreview";
import { NewGroupProvider } from "@/src/features/group/contexts/NewGroupContext";
import { StyleSheet } from "react-native";

const NewGroup = () => {
	return (
		<NewGroupProvider>
			<Screen>
				<Screen.KeyboardAwareScrollView contentContainerStyle={styles.container}>
					<NewGroupPreview />

					<FormValidationProvider>
						<NewGroupForm />
					</FormValidationProvider>
				</Screen.KeyboardAwareScrollView>
			</Screen>
		</NewGroupProvider>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 32,
	},
});

export default NewGroup;
