import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { usePathname } from "expo-router";

type Props = ScreenHeaderProps & {
	title?: string;
};

const SettingsHeader = ({ title, ...rest }: Props) => {
	// #region Hooks
	const pathname = usePathname();
	//#endregion

	// #region Constants
	const showBackButton = pathname !== "/settings";
	//#endregion

	return (
		<Screen.Header {...rest}>
			{showBackButton && <Screen.Header.Back />}
			<Screen.Header.Title>{title}</Screen.Header.Title>
			{showBackButton && <Screen.Header.Placeholder />}
		</Screen.Header>
	);
};

export default SettingsHeader;
