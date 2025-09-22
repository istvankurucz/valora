import Input from "@/src/components/form/Input/Input";
import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import UserListItem from "@/src/features/user/components/ui/UserListItem";
import { useUsers } from "@/src/features/user/contexts/UsersContext";
import { User } from "@/src/features/user/types/userTypes";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

const SettingsMembers = () => {
	// #region States
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [searchText, setSearchText] = useState("");
	//#endregion

	// #region Refs
	const timeoutRef = useRef<number>(undefined);
	//#endregion

	// #region Hooks
	const { users } = useUsers();

	useEffect(() => {
		if (users.length === 0) return;

		setFilteredUsers(users);
	}, [users]);

	useEffect(() => {
		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setFilteredUsers(
				users.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()))
			);
		}, 500);
	}, [users, searchText]);
	// #endregion

	return (
		<Screen>
			<Animated.FlatList
				data={filteredUsers}
				keyExtractor={(user) => user.id}
				renderItem={({ item: user }) => (
					<Link href={`/settings/users/${user.id}`} asChild>
						<UserListItem user={user} />
					</Link>
				)}
				ListHeaderComponent={
					<View style={styles.input}>
						<Input
							search
							placeholder="Search member"
							value={searchText}
							onChangeText={setSearchText}
						/>
					</View>
				}
				ListEmptyComponent={<Section.Empty icon="person-outline" text="No members." />}
				contentContainerStyle={styles.container}
				itemLayoutAnimation={LinearTransition}
			/>
		</Screen>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 12,
		paddingTop: 16,
		paddingBottom: 32,
	},
	input: {
		marginBottom: 12,
	},
});

export default SettingsMembers;
