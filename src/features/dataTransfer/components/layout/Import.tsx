import Button from "@/src/components/ui/Button";
import Collapsible from "@/src/components/ui/Collapsible";
import Section from "@/src/components/ui/Section/Section";
import ThemedText from "@/src/components/ui/ThemedText";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useFeedback } from "@/src/features/feedback/contexts/FeedbackContext";
import capitalizeString from "@/src/utils/string/capitalizeString";
import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import { StyleSheet, View } from "react-native";
import { useImport } from "../../contexts/ImportContext";
import validateImportData from "../../utils/validation/validateImportData";
import ImportList from "../ui/ImportList";
import ImportListItem from "../ui/ImportListItem";

const Import = () => {
	// #region Hooks
	const { importData, setImportData, showModal } = useImport();
	const { setFeedback } = useFeedback();
	const { setError } = useError();
	//#endregion

	// #region Constants
	const adminName = importData?.data.users.find((user) => user.admin)?.name;
	//#endregion

	// #region Functions
	async function handleImportPress() {
		try {
			// Open file picker to select a JSON file
			const result = await DocumentPicker.getDocumentAsync({
				type: "application/json",
				copyToCacheDirectory: true,
			});

			// Check result
			if (result.canceled || !result.assets[0]) return;

			// Get file content
			const file = new File(result.assets[0].uri);
			const content = await file.text();

			// Parse JSON content
			const json = JSON.parse(content);

			// Validate JSON structure
			const importData = validateImportData(json);

			// Set import data
			setImportData(importData);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Data imported successfully!",
			});
		} catch (err) {
			setError(err);
		}
	}

	function handleCancelPress() {
		setImportData(null);
	}
	//#endregion

	return (
		<View>
			<Section.Title>Import data</Section.Title>

			{!importData && (
				<Section style={styles.section}>
					<ThemedText shade={600} style={styles.text}>
						Select a previously exported file.
					</ThemedText>

					<Button title="Import" onPress={handleImportPress} />
				</Section>
			)}

			{importData && (
				<Section style={styles.section}>
					<ThemedText shade={600} style={styles.text}>
						Imported data will overwrite all of your current data.
					</ThemedText>

					<View style={styles.dataContainer}>
						<ThemedText>
							Exported at: {new Date(importData.metadata.exportedAt).toLocaleString()}
						</ThemedText>
						<ThemedText>User: {adminName}</ThemedText>

						<Collapsible title={`${importData.data.transactions.length} transactions`}>
							<ImportList>
								{importData.data.transactions.map((transaction) => (
									<ImportListItem
										key={transaction.id}
										text={`${transaction.label}, ${new Date(
											transaction.timestamp
										).toLocaleString()}`}
									/>
								))}
							</ImportList>
						</Collapsible>

						<Collapsible title={`${importData.data.accounts.length} accounts`}>
							<ImportList>
								{importData.data.accounts.map((account) => (
									<ImportListItem key={account.id} text={account.name} />
								))}
							</ImportList>
						</Collapsible>

						<Collapsible title={`${importData.data.groups.length} groups`}>
							<ImportList>
								{importData.data.groups.map((group) => (
									<ImportListItem key={group.id} text={group.name} />
								))}
							</ImportList>
						</Collapsible>

						<Collapsible
							title={`${importData.data.transactionCategories.length} transaction categories`}
						>
							<ImportList>
								{importData.data.transactionCategories.map((category) => (
									<ImportListItem
										key={category.id}
										text={capitalizeString(category.name)}
									/>
								))}
							</ImportList>
						</Collapsible>
					</View>

					<View style={styles.buttons}>
						<Button
							outlined
							title="Cancel"
							style={styles.button}
							onPress={handleCancelPress}
						/>
						<Button title="Confirm import" style={styles.button} onPress={showModal} />
					</View>
				</Section>
			)}
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	section: {
		gap: 24,
	},
	text: {
		lineHeight: 24,
	},
	dataContainer: {
		gap: 8,
	},
	buttons: {
		flexDirection: "row",
		gap: 16,
	},
	button: {
		flex: 1,
	},
});

export default Import;
