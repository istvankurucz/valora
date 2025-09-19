import logo from "@/src/assets/images/icon.png";
import ThemedText from "@/src/components/ui/ThemedText";
import ThemedView from "@/src/components/ui/ThemedView";
import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useThemeColor from "@/src/hooks/useThemeColor";
import { Image, StyleSheet } from "react-native";

const CreateAccountWelcome = () => {
	// #region Hooks
	const shadowColor = useThemeColor({ variant: "neutral", shade: 400 });
	//#endregion

	return (
		<ThemedView style={styles.container}>
			<ThemedView
				style={[
					styles.imageContainer,
					{ boxShadow: [{ offsetX: 0, offsetY: 4, color: shadowColor, blurRadius: 8 }] },
				]}
			>
				<Image source={logo} style={styles.image} />
			</ThemedView>

			<ThemedText fontFamily="Poppins_700Bold" style={styles.title}>
				Expense tracker
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
	imageContainer: {
		borderRadius: BORDER_RADIUS[500],
		overflow: "hidden",
	},
	image: {
		width: 60,
		height: 60,
	},
	title: {
		fontSize: FONT_SIZE[800],
	},
});

export default CreateAccountWelcome;
