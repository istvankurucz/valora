import { useLastPathname } from "@/src/features/navigation/contexts/LastPathnameContext";
import { useRouter } from "expo-router";
import { GestureResponderEvent } from "react-native";
import Screen from "./Screen/Screen";
import { ScreenHeaderProps } from "./Screen/ScreenHeader/ScreenHeader";

type Props = ScreenHeaderProps & {
	title?: string;
};

const TabsHeader = ({ title, ...rest }: Props) => {
	// #region Hooks
	const { pathname } = useLastPathname();
	const router = useRouter();
	//#endregion

	// #region Functions
	function handleBackPress(e: GestureResponderEvent) {
		e.preventDefault();

		// Remove query string from pathname
		router.setParams({});

		// Navigate to last pathname
		router.replace(pathname as any);
	}
	//#endregion

	return (
		<Screen.Header {...rest}>
			<Screen.Header.Back onPress={handleBackPress} />
			<Screen.Header.Title>{title}</Screen.Header.Title>

			<Screen.Header.Placeholder />
		</Screen.Header>
	);
};

export default TabsHeader;
