import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { usePathname } from "expo-router";
import React from "react";
import AccountHeaderNew from "./AccountHeaderNew";

type Props = ScreenHeaderProps & {
	title?: string;
};

const AccountHeader = ({ title, ...rest }: Props) => {
	// #region Hooks
	const pathname = usePathname();
	//#endregion

	// #region Constants
	const showBackButton = pathname !== "/accounts";
	const showNewAccountButton = pathname === "/accounts";
	//#endregion

	return (
		<Screen.Header {...rest}>
			{showBackButton ? <Screen.Header.Back /> : <Screen.Header.Placeholder />}
			<Screen.Header.Title>{title}</Screen.Header.Title>
			{showNewAccountButton ? <AccountHeaderNew /> : <Screen.Header.Placeholder />}
		</Screen.Header>
	);
};

export default AccountHeader;
