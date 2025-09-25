import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { format } from "date-fns";
import { StyleSheet, View } from "react-native";
import { useAdminUser } from "../../contexts/AdminUserContext";

const AdminWelcome = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	//#endregion

	return (
		<View style={styles.container}>
			<ThemedText fontFamily="Poppins_600SemiBold" style={styles.title}>
				Hi {admin?.name}!
			</ThemedText>

			<View style={styles.date}>
				<ThemedText shade={600} fontFamily="Poppins_500Medium" style={styles.day}>
					{format(new Date(), "EEEE")}
				</ThemedText>
				<ThemedText fontFamily="Poppins_500Medium">
					{format(new Date(), "MMMM d, yyyy")}
				</ThemedText>
			</View>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 32,
		justifyContent: "space-between",
	},
	title: {
		fontSize: FONT_SIZE[700],
	},
	date: {
		alignItems: "flex-end",
	},
	day: {
		fontSize: FONT_SIZE[400],
	},
});

export default AdminWelcome;
