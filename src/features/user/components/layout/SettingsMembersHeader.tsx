import Screen from "@/src/components/layout/Screen/Screen";
import { ScreenHeaderProps } from "@/src/components/layout/Screen/ScreenHeader/ScreenHeader";
import { Link } from "expo-router";

type Props = ScreenHeaderProps & {
	title?: string;
};

const SettingsMembersHeader = ({ title, ...rest }: Props) => {
	return (
		<Screen.Header {...rest}>
			<Screen.Header.Back />
			<Screen.Header.Title>{title}</Screen.Header.Title>
			<Link href="/settings/users/new" asChild>
				<Screen.Header.New />
			</Link>
		</Screen.Header>
	);
};

export default SettingsMembersHeader;
