import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { Link, usePathname } from "expo-router";

type Props = ScreenHeaderProps & {
	title?: string;
};

const GroupsHeader = ({ title, ...rest }: Props) => {
	// #region Hooks
	const pathname = usePathname();
	//#endregion

	// #region Constants
	const showBackButton = pathname !== "/groups";
	const showNewGroupButton = pathname === "/groups";
	//#endregion

	return (
		<Screen.Header {...rest}>
			{showBackButton ? <Screen.Header.Back /> : <Screen.Header.Placeholder />}
			<Screen.Header.Title>{title}</Screen.Header.Title>
			{showNewGroupButton ? (
				<Link href="/groups/new" asChild>
					<Screen.Header.New />
				</Link>
			) : (
				<Screen.Header.Placeholder />
			)}
		</Screen.Header>
	);
};

export default GroupsHeader;
