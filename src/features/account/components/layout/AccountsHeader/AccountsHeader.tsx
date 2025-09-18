import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { Link, usePathname } from "expo-router";

type Props = ScreenHeaderProps & {
	title?: string;
};

const AccountsHeader = ({ title, ...rest }: Props) => {
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
			{showNewAccountButton ? (
				<Link href="/accounts/new" asChild>
					<Screen.Header.New />
				</Link>
			) : (
				<Screen.Header.Placeholder />
			)}
		</Screen.Header>
	);
};

export default AccountsHeader;
