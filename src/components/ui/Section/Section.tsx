import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { StyleSheet } from "react-native";
import SectionTitle from "../SectionTitle";
import ThemedView, { ThemedViewProps } from "../ThemedView";
import EmptySection from "./EmptySection";

export type SectionProps = ThemedViewProps;

const Section = ({ shade, style, children, ...rest }: SectionProps) => {
	return (
		<ThemedView shade={shade ?? 100} style={[styles.section, style]} {...rest}>
			{children}
		</ThemedView>
	);
};

// Style
const styles = StyleSheet.create({
	section: {
		borderRadius: BORDER_RADIUS[500],
		padding: 16,
	},
});

// Children
Section.Title = SectionTitle;
Section.Empty = EmptySection;

export default Section;
