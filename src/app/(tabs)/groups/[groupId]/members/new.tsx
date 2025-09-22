import Input from "@/src/components/form/Input/Input";
import Screen from "@/src/components/layout/Screen/Screen";
import Button from "@/src/components/ui/Button";
import Section from "@/src/components/ui/Section/Section";
import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import SearchGroupUserListItem from "@/src/features/group/components/ui/SearchGroupUserListItem";
import { useGroup } from "@/src/features/group/contexts/GroupContext";
import useCreateGroupUsers from "@/src/features/group/hooks/useCreateGroupUsers";
import useCreateUser from "@/src/features/user/hooks/useCreateUser";
import useGetUsers from "@/src/features/user/hooks/useGetUsers";
import { User } from "@/src/features/user/types/userTypes";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

const NewGroupMember = () => {
	// #region States
	const [members, setMembers] = useState<User[]>([]);
	const [searchText, setSearchText] = useState("");
	//#endregion

	// #region Refs
	const timeoutRef = useRef<number>(undefined);
	//#endregion

	// #region Hooks
	const { group } = useGroup();
	const { users } = useGetUsers();
	const { createUser, loading: loadingCreateUser } = useCreateUser();
	const { createGroupUsers, loading: loadingCreateGroupUser } = useCreateGroupUsers();
	const { setError } = useError();

	useEffect(() => {
		if (users.length === 0) return;

		setMembers(users);
	}, [users]);

	useEffect(() => {
		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setMembers(
				users.filter((user) => user.name.toLowerCase().includes(searchText.toLocaleLowerCase()))
			);
		}, 500);
	}, [users, searchText]);
	//#endregion

	//#region Constants
	const loading = loadingCreateUser || loadingCreateGroupUser;
	//#endregion

	// #region Functions
	async function handleCreateMemberPress() {
		// Check group
		if (!group) return;

		try {
			// Create user
			const user = await createUser({ name: searchText });

			// Create group user
			await createGroupUsers({ groupId: group.id, userIds: [user.id] });

			// Clear search text
			setSearchText("");
		} catch (err) {
			console.log(err);
			setError(err);
		}
	}
	//#endregion

	return (
		<Screen>
			<Animated.FlatList
				data={members}
				keyExtractor={(member) => member.id}
				renderItem={({ item: member }) => <SearchGroupUserListItem user={member} />}
				ListHeaderComponent={
					<View>
						<Input
							search
							placeholder="Search/create user"
							value={searchText}
							onChangeText={setSearchText}
						/>
						{members.length === 0 && (
							<ThemedText shade={600} style={styles.info}>
								Type the name of the new member to add him.
							</ThemedText>
						)}
					</View>
				}
				ListEmptyComponent={
					<View>
						{searchText !== "" && (
							<Button
								title={`Add ${searchText}`}
								loading={loading}
								onPress={handleCreateMemberPress}
							/>
						)}
						<Section.Empty icon="person-outline" text="No user found." />
					</View>
				}
				keyboardShouldPersistTaps="handled"
				itemLayoutAnimation={LinearTransition}
				contentContainerStyle={styles.container}
			/>
		</Screen>
	);
};

// Styles
const styles = StyleSheet.create({
	info: {
		gap: 8,
		fontSize: FONT_SIZE[400],
		marginTop: 8,
	},
	container: {
		gap: 12,
		paddingTop: 16,
		paddingBottom: 32,
	},
});

export default NewGroupMember;
