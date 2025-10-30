import Screen from "@/src/components/layout/Screen/Screen";
import { ChartModalProvider } from "@/src/features/chart/contexts/ChartModalContext";
import { TransactionCategoriesChartProvider } from "@/src/features/chart/contexts/TransactionCategoriesChartContext";
import TransactionCategoriesList from "@/src/features/transactionCategory/components/layout/TransactionCategoriesList";
import TransactionCategoriesTransactionCategoriesChart from "@/src/features/transactionCategory/components/layout/TransactionCategoriesTransactionCategoriesChart";

const TransactionCategories = () => {
	return (
		<Screen>
			<Screen.ScrollView>
				<Screen.Container>
					<ChartModalProvider>
						<TransactionCategoriesChartProvider showIncomesOnLoad>
							<TransactionCategoriesTransactionCategoriesChart />
						</TransactionCategoriesChartProvider>
					</ChartModalProvider>

					<TransactionCategoriesList />
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

export default TransactionCategories;
