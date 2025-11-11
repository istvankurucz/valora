import InputsContainer from "@/src/components/form/InputsContainer";
import Label from "@/src/components/form/Label";
import Switch from "@/src/components/form/Switch";
import Section from "@/src/components/ui/Section/Section";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import useUpdateAdminPreferences from "@/src/features/user/hooks/useUpdateAdminPreferences";
import { StyleSheet, View } from "react-native";

const EditNotificationsForm = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	const { updateAdminPreferences } = useUpdateAdminPreferences();
	const { setError } = useError();
	//#endregion

	// #region Functions
	async function handleNotificationsChange(value: boolean) {
		// Check admin
		if (!admin) return;

		try {
			await updateAdminPreferences({ notifications: value });
		} catch (err) {
			setError(err);
		}
	}
	//#endregion

	return (
		<View>
			<Section.Title>Reminders</Section.Title>

			<InputsContainer>
				<View style={styles.switchContainer}>
					<Label fontFamily="Poppins_400Regular">Daily reminders</Label>
					<Switch
						value={admin?.preferences.notifications}
						onValueChange={handleNotificationsChange}
					/>
				</View>
			</InputsContainer>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	switchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default EditNotificationsForm;
