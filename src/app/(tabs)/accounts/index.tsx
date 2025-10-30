import Screen from "@/src/components/layout/Screen/Screen";
import AccountsBalanceChart from "@/src/features/account/components/layout/AccountsBalanceChart";
import AccountsList from "@/src/features/account/components/layout/AccountsList";
import { AccountsBalanceChartProvider } from "@/src/features/chart/contexts/AccountsBalanceChartContext";
import { ChartModalProvider } from "@/src/features/chart/contexts/ChartModalContext";

const AccountsIndex = () => {
	return (
		<Screen>
			<Screen.ScrollView>
				<Screen.Container>
					<ChartModalProvider>
						<AccountsBalanceChartProvider>
							<AccountsBalanceChart />
						</AccountsBalanceChartProvider>
					</ChartModalProvider>
					<AccountsList />
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

export default AccountsIndex;
