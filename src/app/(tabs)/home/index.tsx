import Screen from "@/src/components/layout/Screen/Screen";
import { ChartModalProvider } from "@/src/features/chart/contexts/ChartModalContext";
import { TransactionCategoriesChartProvider } from "@/src/features/chart/contexts/TransactionCategoriesChartContext";
import RecurringTransactions from "@/src/features/transaction/components/layout/RecurringTransactions";
import AdminBalanceChart from "@/src/features/user/components/layout/AdminBalanceChart";
import AdminLatestTransactions from "@/src/features/user/components/layout/AdminLatestTransactions";
import AdminTransactionCategoriesChart from "@/src/features/user/components/layout/AdminTransactionCategoriesChart";
import AdminWelcome from "@/src/features/user/components/layout/AdminWelcome";

const Home = () => {
	return (
		<Screen hasHeader={false}>
			<Screen.ScrollView>
				<Screen.Container>
					<AdminWelcome />

					<RecurringTransactions />

					<AdminBalanceChart />

					<ChartModalProvider>
						<TransactionCategoriesChartProvider>
							<AdminTransactionCategoriesChart />
						</TransactionCategoriesChartProvider>
					</ChartModalProvider>

					<AdminLatestTransactions />
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

export default Home;
