import ListContainer from "@/src/components/layout/ListContainer";
import Section from "@/src/components/ui/Section/Section";
import { Link } from "expo-router";
import { View } from "react-native";
import { useUser } from "../../contexts/UserContext";
import UserGroupListItem from "../ui/UserGroupListItem";

const UserGroups = () => {
	// #region Hooks
	const { user } = useUser();
	//#endregion

	return (
		<View>
			<Section.Title>Gropus</Section.Title>

			<ListContainer>
				{user?.groups.length === 0 && <Section.Empty icon="people-outline" text="No groups." />}
				{user?.groups.map((group) => (
					<Link key={group.id} href={`/groups/${group.id}/members/${user.id}`} asChild>
						<UserGroupListItem group={group} />
					</Link>
				))}
			</ListContainer>
		</View>
	);
};

export default UserGroups;
