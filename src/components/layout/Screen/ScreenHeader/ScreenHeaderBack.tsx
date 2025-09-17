import { IconUnderlayProps } from "@/src/components/ui/Underlay/IconUnderlay";
import useThemeColor from "@/src/hooks/useThemeColor";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { GestureResponderEvent } from "react-native";
import Screen from "../Screen";

type Props = IconUnderlayProps;

const ScreenHeaderBack = ({ onPress, ...rest }: Props) => {
	// #region Hooks
	const router = useRouter();

	const iconColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	//#region Functions
	function handlePress(e: GestureResponderEvent) {
		// Navigate back
		router.back();

		// Run event handler
		onPress?.(e);
	}
	//#endregion

	return (
		<Screen.Header.IconUnderlay onPress={handlePress} {...rest}>
			<Feather name="arrow-left" size={20} color={iconColor} />
		</Screen.Header.IconUnderlay>
	);
};

export default ScreenHeaderBack;
