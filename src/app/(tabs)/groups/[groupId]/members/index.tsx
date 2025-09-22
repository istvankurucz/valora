import Input from "@/src/components/form/Input/Input";
import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import GroupUserListItem from "@/src/features/group/components/ui/GroupUserListItem";
import { useGroup } from "@/src/features/group/contexts/GroupContext";
import { GroupUser } from "@/src/features/group/types/groupTypes";
import { Link, Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const GroupMembers = () => {
	// #region States
	const [users, setUsers] = useState<GroupUser[]>([]);
	const [searchText, setSearchText] = useState("");
	//#endregion

	// #region Refs
	const timeoutRef = useRef<number>(undefined);
	//#endregion

	// #region Hooks
	const { group } = useGroup();

	// Init users array
	useEffect(() => {
		if (!group) return;

		setUsers(group.users);
	}, [group]);

	// Search users
	useEffect(() => {
		if (!group) return;

		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setUsers(
				group.users.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()))
			);
		}, 500);
	}, [group, searchText]);
	//#endregion

	return (
		<Screen>
			<Stack.Screen options={{ title: `${group?.name} members` }} />

			<FlatList
				data={users}
				keyExtractor={(user) => user.id}
				renderItem={({ item: user }) => (
					<Link href={`/groups/${group?.id}/members/${user.id}`} asChild>
						<GroupUserListItem user={user} />
					</Link>
				)}
				ListHeaderComponent={
					<View style={styles.search}>
						<Input
							search
							placeholder="Search member"
							value={searchText}
							onChangeText={(searchText) => setSearchText(searchText)}
						/>
					</View>
				}
				ListEmptyComponent={<Section.Empty icon="person-outline" text="No member found." />}
				contentContainerStyle={styles.container}
			/>
		</Screen>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 12,
	},
	search: {
		marginTop: 16,
		marginBottom: 16,
	},
});

export default GroupMembers;
