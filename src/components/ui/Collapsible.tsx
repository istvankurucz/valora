import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";
import ThemedText from "./ThemedText";

type Props = ViewProps & {
	defaultOpen?: boolean;
	title: string;
};

const Collapsible = ({ defaultOpen, title, children, ...rest }: Props) => {
	// #region States
	const [open, setOpen] = useState(defaultOpen);
	//#endregion

	// #region Hooks
	const iconColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	// #region Functions
	const handleTitlePress = () => {
		setOpen((open) => !open);
	};
	//#endregion

	return (
		<View style={styles.container}>
			<Pressable hitSlop={4} style={styles.header} onPress={handleTitlePress}>
				<Ionicons
					name={open ? "chevron-down" : "chevron-forward"}
					size={14}
					color={iconColor}
					style={styles.icon}
				/>
				<ThemedText>{title}</ThemedText>
			</Pressable>

			{open && <View {...rest}>{children}</View>}
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	header: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
	icon: {
		marginBottom: 2,
	},
});

export default Collapsible;
