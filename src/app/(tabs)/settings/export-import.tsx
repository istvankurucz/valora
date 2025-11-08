import Screen from "@/src/components/layout/Screen/Screen";
import ThemedText from "@/src/components/ui/ThemedText";
import Export from "@/src/features/dataTransfer/components/layout/Export";
import Import from "@/src/features/dataTransfer/components/layout/Import";
import { ImportProvider } from "@/src/features/dataTransfer/contexts/ImportContext";
import { StyleSheet } from "react-native";

const ExportImport = () => {
	return (
		<Screen>
			<Screen.ScrollView>
				<Screen.Container>
					<ThemedText shade={600} style={styles.text}>
						Exporting creates a safe backup of your data so you can restore it by importing it
						back if you change your device.
					</ThemedText>

					<Export />

					<ImportProvider>
						<Import />
					</ImportProvider>
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

// Styles
const styles = StyleSheet.create({
	text: {
		lineHeight: 24,
	},
});

export default ExportImport;
