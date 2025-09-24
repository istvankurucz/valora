import Screen from "@/src/components/layout/Screen/Screen";
import TransactionDetails from "@/src/features/transaction/components/ui/TransactionDetails";
import { useTransaction } from "@/src/features/transaction/contexts/TransactionContext";

const GroupTransaction = () => {
	// #region Hooks
	const { transaction } = useTransaction();
	//#endregion

	return (
		<Screen>
			<Screen.ScrollView>
				<TransactionDetails transaction={transaction} />
			</Screen.ScrollView>
		</Screen>
	);
};

export default GroupTransaction;
