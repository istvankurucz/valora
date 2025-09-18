import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView, { ThemedViewProps } from "../../../ui/ThemedView";
import ScreenHeaderBack from "./ScreenHeaderBack";
import ScreenHeaderIconUnderlay from "./ScreenHeaderIconUnderlay";
import ScreenHeaderNew from "./ScreenHeaderNew";
import ScreenHeaderOptions from "./ScreenHeaderOptions";
import ScreenHeaderPlaceholder from "./ScreenHeaderPlaceholder";
import ScreenHeaderTitle from "./ScreenHeaderTitle";

export type ScreenHeaderProps = ThemedViewProps;

const ScreenHeader = ({ style, children, ...rest }: ScreenHeaderProps) => {
	//#region Hooks
	// const shadowColor = useThemeColor({ variant: "neutral", shade: 300 });
	//#endregion

	return (
		<SafeAreaView>
			<ThemedView
				style={[
					styles.inner,
					// { boxShadow: [{ offsetX: 0, offsetY: 4, color: shadowColor, blurRadius: 4 }] },
					style,
				]}
				{...rest}
			>
				{children}
			</ThemedView>
		</SafeAreaView>
	);
};

// Styles
const styles = StyleSheet.create({
	inner: {
		flexDirection: "row",
		gap: 16,
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		marginBottom: -16,
	},
});

// Children
ScreenHeader.Title = ScreenHeaderTitle;
ScreenHeader.IconUnderlay = ScreenHeaderIconUnderlay;
ScreenHeader.Back = ScreenHeaderBack;
ScreenHeader.Options = ScreenHeaderOptions;
ScreenHeader.New = ScreenHeaderNew;
ScreenHeader.Placeholder = ScreenHeaderPlaceholder;

export default ScreenHeader;
