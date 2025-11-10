import Screen from "@/src/components/layout/Screen/Screen";
import Section from "@/src/components/ui/Section/Section";
import SettingsListItem from "@/src/features/user/components/ui/SettingsListItem";
import { Link } from "expo-router";

const Settings = () => {
	return (
		<Screen>
			<Section>
				<Link href="/settings/my-data" asChild>
					<SettingsListItem icon="person-outline" label="My data" />
				</Link>
				<Link href="/settings/transaction-categories" asChild>
					<SettingsListItem icon="pricetag-outline" label="Transaction categories" />
				</Link>
				<Link href="/settings/users" asChild>
					<SettingsListItem icon="people-outline" label="Members" />
				</Link>
				<Link href="/settings/recurring-transactions" asChild>
					<SettingsListItem icon="sync-outline" label="Recurring transactions" />
				</Link>
				<Link href="/settings/data-transfer" asChild>
					<SettingsListItem icon="swap-horizontal-outline" label="Data transfer" />
				</Link>
				<Link href="/settings/info" asChild>
					<SettingsListItem icon="information-outline" label="App info and support" />
				</Link>
			</Section>
		</Screen>
	);
};

export default Settings;
