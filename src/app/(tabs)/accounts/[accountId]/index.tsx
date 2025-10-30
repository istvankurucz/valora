import Screen from "@/src/components/layout/Screen/Screen";
import AccontTransactionCategoriesChart from "@/src/features/account/components/layout/AccontTransactionCategoriesChart";
import AccountBalanceChart from "@/src/features/account/components/layout/AccountBalanceChart";
import AccountLatestTransactions from "@/src/features/account/components/layout/AccountLatestTransactions";
import { useAccount } from "@/src/features/account/contexts/AccountContext";
import { ChartModalProvider } from "@/src/features/chart/contexts/ChartModalContext";
import { TransactionCategoriesChartProvider } from "@/src/features/chart/contexts/TransactionCategoriesChartContext";
import { Stack } from "expo-router";

const Account = () => {
	//#region Hooks
	const { account } = useAccount();
	// #endregion

	return (
		<Screen>
			<Stack.Screen options={{ title: account?.name }} />

			<Screen.ScrollView>
				<Screen.Container>
					<AccountBalanceChart />
					<ChartModalProvider>
						<TransactionCategoriesChartProvider>
							<AccontTransactionCategoriesChart />
						</TransactionCategoriesChartProvider>
					</ChartModalProvider>
					<AccountLatestTransactions />
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

export default Account;
