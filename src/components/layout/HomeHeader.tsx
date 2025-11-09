import logo from "@/src/assets/images/valora_logo_v2.png";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import { Image, StyleSheet, View } from "react-native";
import ThemedText from "../ui/ThemedText";

const HomeHeader = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	//#endregion

	return (
		<View style={styles.header}>
			<View style={styles.app}>
				<Image source={logo} style={styles.logo} />
				<ThemedText style={styles.appName}>Valora</ThemedText>
			</View>

			<ThemedText style={styles.text}>Hi {admin?.name}!</ThemedText>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		gap: 32,
		justifyContent: "space-between",
		alignItems: "center",
	},
	app: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
	logo: {
		width: 40,
		height: 40,
	},
	appName: {
		fontSize: FONT_SIZE[700],
		marginTop: 4,
	},
	text: {
		fontSize: FONT_SIZE[600],
	},
});

export default HomeHeader;
