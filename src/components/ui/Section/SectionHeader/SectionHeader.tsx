import { StyleSheet, View, ViewProps } from "react-native";
import SectionHeaderLink from "./SectionHeaderLink";

export type SectionHeaderProps = ViewProps;

const SectionHeader = ({ style, children, ...rest }: SectionHeaderProps) => {
	return (
		<View style={[styles.header, style]} {...rest}>
			{children}
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		gap: 32,
		justifyContent: "space-between",
		alignItems: "center",
	},
});

// Children
SectionHeader.Link = SectionHeaderLink;

export default SectionHeader;
