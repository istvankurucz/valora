import Screen from "@/src/components/layout/Screen/Screen";
import TransactionCategoriesList from "@/src/features/transactionCategory/components/layout/TransactionCategoriesList";
import TransactionCategoriesTransactionCategoriesChart from "@/src/features/transactionCategory/components/layout/TransactionCategoriesTransactionCategoriesChart";

const TransactionCategories = () => {
	return (
		<Screen>
			<Screen.ScrollView>
				<Screen.Container>
					<TransactionCategoriesTransactionCategoriesChart />
					<TransactionCategoriesList />
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

export default TransactionCategories;
