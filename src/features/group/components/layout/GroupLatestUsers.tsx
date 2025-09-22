import ListContainer from "@/src/components/layout/ListContainer";
import Section from "@/src/components/ui/Section/Section";
import { Link } from "expo-router";
import { View } from "react-native";
import { useGroup } from "../../contexts/GroupContext";
import GroupUserListItem from "../ui/GroupUserListItem";

const GroupLatestUsers = () => {
	// #region Hooks
	const { group } = useGroup();
	//#endregion

	return (
		<View>
			<Section.Header>
				<Section.Title>Newest members</Section.Title>
				<Link href={`/groups/${group?.id}/members`}>
					<Section.Header.Link>See all</Section.Header.Link>
				</Link>
			</Section.Header>

			<ListContainer>
				{group?.users.slice(0, 5).map((user) => (
					<Link key={user.id} href={`/groups/${group.id}/members/${user.id}`} asChild>
						<GroupUserListItem user={user} />
					</Link>
				))}
			</ListContainer>
		</View>
	);
};

export default GroupLatestUsers;
