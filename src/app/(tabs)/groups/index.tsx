import Screen from "@/src/components/layout/Screen/Screen";
import GroupsList from "@/src/features/group/components/layout/GroupsList";

const Groups = () => {
	return (
		<Screen>
			<Screen.ScrollView>
				<Screen.Container>
					<GroupsList />
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

export default Groups;
