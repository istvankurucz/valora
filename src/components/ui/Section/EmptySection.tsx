import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import ThemedText from "../ThemedText";
import Section, { SectionProps } from "./Section";

type Props = SectionProps & {
	icon: string;
	text: string;
};

const EmptySection = ({ icon, text, style, shade, ...rest }: Props) => {
	// #region Hooks
	const iconColor = useThemeColor({ variant: "neutral", shade: 400 });
	//#endregion

	return (
		<Section shade={shade ?? 200} style={[styles.section, style]} {...rest}>
			<Ionicons name={icon as any} size={48} color={iconColor} />
			<ThemedText shade={500}>{text}</ThemedText>
		</Section>
	);
};

// Style
const styles = StyleSheet.create({
	section: {
		gap: 12,
		alignItems: "center",
		paddingVertical: 32,
	},
});

export default EmptySection;
