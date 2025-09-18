import ListContainer from "@/src/components/layout/ListContainer";
import SectionTitle from "@/src/components/ui/SectionTitle";
import ThemedView from "@/src/components/ui/ThemedView";
import { Link } from "expo-router";
import useGetGroups from "../../hooks/useGetGroups";
import GroupListItem from "../ui/GroupListItem";

const GroupsList = () => {
	//#region Hooks
	const { groups } = useGetGroups();
	//#endregion

	return (
		<ThemedView>
			<SectionTitle>Groups</SectionTitle>

			<ListContainer>
				{groups.map((group) => (
					<Link key={group.id} href={`/groups/${group.id}`} asChild>
						<GroupListItem group={group} />
					</Link>
				))}
			</ListContainer>
		</ThemedView>
	);
};

export default GroupsList;
