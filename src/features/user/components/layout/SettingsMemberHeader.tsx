import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { useLastPathname } from "@/src/features/navigation/contexts/LastPathnameContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { RefObject } from "react";
import { GestureResponderEvent } from "react-native";

type Props = ScreenHeaderProps & {
	title?: string;
	mainModalRef: RefObject<BottomSheetModal | null>;
};

const SettingsMemberHeader = ({ title, mainModalRef, ...rest }: Props) => {
	// #region Hooks
	const pathname = usePathname();
	const { pathname: lastPathname } = useLastPathname();
	const { userId } = useLocalSearchParams<{ userId?: string }>();
	const router = useRouter();
	//#endregion

	// #region Constants
	const showOptionsButton = pathname === `/settings/users/${userId}`;
	//#endregion

	// #region Functions
	function handleBackPress(e: GestureResponderEvent) {
		e.preventDefault();

		router.replace(lastPathname as any);
	}

	function showMainModal() {
		mainModalRef.current?.present();
	}
	//#endregion

	return (
		<Screen.Header {...rest}>
			<Screen.Header.Back onPress={handleBackPress} />
			<Screen.Header.Title>{title}</Screen.Header.Title>
			{showOptionsButton ? (
				<Screen.Header.Options onPress={showMainModal} />
			) : (
				<Screen.Header.Placeholder />
			)}
		</Screen.Header>
	);
};

export default SettingsMemberHeader;
