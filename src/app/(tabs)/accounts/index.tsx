import Screen from "@/src/components/layout/Screen/Screen";
import AccountsBalanceChart from "@/src/features/account/components/layout/AccountsBalanceChart";
import AccountsList from "@/src/features/account/components/layout/AccountsList";

const AccountsIndex = () => {
	return (
		<Screen>
			<Screen.ScrollView>
				<Screen.Container>
					<AccountsBalanceChart />
					<AccountsList />
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

export default AccountsIndex;
