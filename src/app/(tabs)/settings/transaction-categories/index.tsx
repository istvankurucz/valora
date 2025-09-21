import Screen from "@/src/components/layout/Screen/Screen";
import TransactionCategoriesList from "@/src/features/transactionCategory/components/layout/TransactionCategoriesList";

const TransactionCategories = () => {
	return (
		<Screen>
			<Screen.ScrollView>
				<TransactionCategoriesList />
			</Screen.ScrollView>
		</Screen>
	);
};

export default TransactionCategories;
