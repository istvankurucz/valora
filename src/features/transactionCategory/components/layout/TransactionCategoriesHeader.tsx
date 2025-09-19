import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { Link, usePathname } from "expo-router";
import React from "react";

type Props = ScreenHeaderProps & {
	title?: string;
};

const TransactionCategoriesHeader = ({ title, ...rest }: Props) => {
	// #region Hooks
	const pathname = usePathname();
	//#endregion

	// #region Constants
	const showNewAccountButton = pathname === "/settings/transaction-categories";
	//#endregion

	return (
		<Screen.Header {...rest}>
			<Screen.Header.Back />
			<Screen.Header.Title>{title}</Screen.Header.Title>
			{showNewAccountButton ? (
				<Link href="/settings/transaction-categories/new" asChild>
					<Screen.Header.New />
				</Link>
			) : (
				<Screen.Header.Placeholder />
			)}
		</Screen.Header>
	);
};

export default TransactionCategoriesHeader;
