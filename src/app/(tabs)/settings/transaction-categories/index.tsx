import Screen from "@/src/components/layout/Screen/Screen";
import TransactionCategoriesList from "@/src/features/transactionCategory/components/layout/TransactionCategoriesList";
import { TransactionCategoriesProvider } from "@/src/features/transactionCategory/contexts/TransactionCategoriesContext";

const TransactionCategories = () => {
	return (
		<TransactionCategoriesProvider>
			<Screen>
				<Screen.ScrollView>
					<TransactionCategoriesList />
				</Screen.ScrollView>
			</Screen>
		</TransactionCategoriesProvider>
	);
};

export default TransactionCategories;
