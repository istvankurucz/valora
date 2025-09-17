import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
	name: string;
	focused: boolean;
};

const TabBarIcon = ({ name, focused }: Props) => {
	//#region Hooks
	const defaultColor = useThemeColor({ variant: "neutral", shade: 500 });
	const focusedColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	return (
		<Ionicons
			name={`${name}${focused ? "" : "-outline"}` as any}
			color={focused ? focusedColor : defaultColor}
			size={24}
		/>
	);
};

export default TabBarIcon;
