import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import SettingsListItem from "@/src/features/user/components/ui/SettingsListItem";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

const Settings = () => {
	return (
		<Screen>
			<Screen.ScrollView>
				<Screen.Container>
					<View>
						<Section.Title>Users</Section.Title>
						<Section style={styles.section}>
							<Link href="/settings/my-data" asChild>
								<SettingsListItem icon="person-outline" label="My data" />
							</Link>

							<Link href="/settings/users" asChild>
								<SettingsListItem icon="people-outline" label="Members" />
							</Link>
						</Section>
					</View>

					<View>
						<Section.Title>Transactions</Section.Title>
						<Section style={styles.section}>
							<Link href="/settings/transaction-categories" asChild>
								<SettingsListItem icon="pricetag-outline" label="Transaction categories" />
							</Link>
							<Link href="/settings/recurring-transactions" asChild>
								<SettingsListItem icon="sync-outline" label="Recurring transactions" />
							</Link>
						</Section>
					</View>

					<View>
						<Section.Title>Data transfer</Section.Title>
						<Section style={styles.section}>
							<Link href="/settings/data-transfer" asChild>
								<SettingsListItem icon="swap-horizontal-outline" label="Data transfer" />
							</Link>
						</Section>
					</View>

					<View>
						<Section.Title>Notifications</Section.Title>
						<Section style={styles.section}>
							<Link href="/settings/notifications" asChild>
								<SettingsListItem icon="notifications-outline" label="Notifications" />
							</Link>
						</Section>
					</View>

					<View>
						<Section.Title>App info and support</Section.Title>
						<Section style={styles.section}>
							<Link href="/settings/info" asChild>
								<SettingsListItem icon="information-outline" label="App info and support" />
							</Link>
						</Section>
					</View>
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

// Styles
const styles = StyleSheet.create({
	section: {
		paddingVertical: 8,
	},
});

export default Settings;
