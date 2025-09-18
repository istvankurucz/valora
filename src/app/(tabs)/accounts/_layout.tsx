import AccountsHeader from "@/src/features/account/components/layout/AccountsHeader/AccountsHeader";
import { Stack } from "expo-router";

const AccountsLayout = () => {
	return (
		<Stack
			screenOptions={{
				header: ({ options }) => <AccountsHeader title={options.title} />,
			}}
		>
			<Stack.Screen name="index" options={{ title: "Accounts" }} />
			<Stack.Screen name="new" options={{ title: "New account" }} />
			<Stack.Screen name="[accountId]" options={{ headerShown: false }} />
		</Stack>
	);
};

export default AccountsLayout;
