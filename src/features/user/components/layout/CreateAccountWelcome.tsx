import logo from "@/src/assets/images/icon.png";
import ThemedText from "@/src/components/ui/ThemedText";
import ThemedView from "@/src/components/ui/ThemedView";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { Image, StyleSheet } from "react-native";

const CreateAccountWelcome = () => {
	return (
		<ThemedView style={styles.container}>
			<Image source={logo} style={styles.image} />
			<ThemedText fontFamily="Poppins_700Bold" style={styles.title}>
				Expense tarcker
			</ThemedText>
		</ThemedView>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 16,
		alignItems: "center",
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: BORDER_RADIUS[500],
	},
	title: {
		fontSize: FONT_SIZE[800],
	},
});

export default CreateAccountWelcome;
