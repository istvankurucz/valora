import ListContainer from "@/src/components/layout/ListContainer";
import Section from "@/src/components/ui/Section/Section";
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
			<Section.Title>Groups</Section.Title>

			<ListContainer>
				{groups.length === 0 && <Section.Empty icon="people-outline" text="No groups." />}
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
