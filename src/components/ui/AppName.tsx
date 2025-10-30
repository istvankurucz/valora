import { FONT_SIZE } from "@/src/constants/fontSizes";
import { StyleSheet } from "react-native";
import ThemedText from "./ThemedText";

const AppName = () => {
	return (
		<ThemedText shade={800} fontFamily="Poppins_600SemiBold_Italic" style={styles.name}>
			Valora
		</ThemedText>
	);
};

// Styles
const styles = StyleSheet.create({
	name: {
		fontSize: FONT_SIZE[700],
	},
});

export default AppName;
