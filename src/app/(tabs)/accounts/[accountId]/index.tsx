import Screen from "@/src/components/layout/Screen/Screen";
import ThemedText from "@/src/components/ui/ThemedText";
import { useAccount } from "@/src/features/account/contexts/AccountContext";
import { Stack } from "expo-router";

const Account = () => {
	//#region Hooks
	const { account } = useAccount();
	// #endregion

	return (
		<Screen>
			<Stack.Screen options={{ title: account?.name }} />

			<ThemedText>Account</ThemedText>
		</Screen>
	);
};

export default Account;
