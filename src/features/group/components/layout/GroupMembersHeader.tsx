import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { Link, useLocalSearchParams, usePathname } from "expo-router";

type Props = ScreenHeaderProps & {
	title?: string;
};

const GroupMembersHeader = ({ title, ...rest }: Props) => {
	// #region Hooks
	const pathname = usePathname();
	const { groupId } = useLocalSearchParams<{ groupId?: string }>();
	//#endregion

	//#region Constants
	const showNewButton = pathname !== `/groups/${groupId}/members/new`;
	//#endregion

	return (
		<Screen.Header {...rest}>
			<Screen.Header.Back />
			<Screen.Header.Title>{title}</Screen.Header.Title>
			{showNewButton ? (
				<Link href={`/groups/${groupId}/members/new`} asChild>
					<Screen.Header.New />
				</Link>
			) : (
				<Screen.Header.Placeholder />
			)}
		</Screen.Header>
	);
};

export default GroupMembersHeader;
