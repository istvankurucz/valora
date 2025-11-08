import Button from "@/src/components/ui/Button";
import Section from "@/src/components/ui/Section/Section";
import ThemedText from "@/src/components/ui/ThemedText";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useFeedback } from "@/src/features/feedback/contexts/FeedbackContext";
import { File } from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system/legacy";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import createExportFile from "../../services/createExportFile";
import getExportData from "../../utils/getExportData";

const Export = () => {
	// #region States
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { setFeedback } = useFeedback();
	const { setError } = useError();
	//#endregion

	// #region Functions
	async function handleExportPress() {
		setLoading(true);

		try {
			// Request permission to access the document directory
			const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
			if (!permissions.granted) return;

			// Create a new file in the selected directory
			const uri = await createExportFile(permissions.directoryUri);

			// Get export data
			const data = await getExportData();

			// Write data to the file
			const file = new File(uri);
			file.write(JSON.stringify(data));

			// Show feedback
			setFeedback({
				type: "success",
				message: "Data exported successfully!",
				details: "You can find the exported file in the selected directory.",
			});
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	//#endregion

	return (
		<View>
			<Section.Title>Export data</Section.Title>
			<Section>
				<ThemedText shade={600} style={styles.text}>
					First, you will be asked to select a folder for the file.
				</ThemedText>

				<Button title="Export" loading={loading} onPress={handleExportPress} />
			</Section>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	text: {
		lineHeight: 24,
		marginBottom: 24,
	},
});

export default Export;
