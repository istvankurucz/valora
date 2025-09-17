import Screen from "@/src/components/layout/Screen/Screen";
import AccountsList from "@/src/features/account/components/layout/AccountsList";

const AccountsIndex = () => {
	return (
		<Screen>
			<Screen.ScrollView>
				<AccountsList />
			</Screen.ScrollView>
		</Screen>
	);
};

export default AccountsIndex;
