import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps & {
	icon: string;
	title: string;
};

const TransactionSectionHeader = ({ icon, title, style, ...rest }: Props) => {
	// #region Hooks
	const iconColor = useThemeColor({ variant: "neutral", shade: 500 });
	//#endregion

	return (
		<View style={[styles.header, style]} {...rest}>
			<View style={styles.icon}>
				<Ionicons name={icon as any} size={14} color={iconColor} />
			</View>
			<ThemedText shade={500} fontFamily="Poppins_500Medium" style={styles.text}>
				{title}
			</ThemedText>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 16,
	},
	icon: {
		marginTop: 2,
	},
	text: {
		fontSize: FONT_SIZE[400],
	},
});

export default TransactionSectionHeader;
