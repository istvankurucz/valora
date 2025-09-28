import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import { TransactionSelect } from "../../transaction/types/transactionTypes";
import moveTransactionCategoryTransactionsToDifferentTransactionCategory from "../services/moveTransactionCategoryTransactionsToDifferentTransactionCategory";

type MoveTransactionCategoryTransactionsToDifferentTransactionCategoryVariables = {
	transactionIds: string[];
	newTransactionCategoryId: string;
};

const useMoveTransactionCategoryTransactionsToDifferentTransactionCategory = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		TransactionSelect[],
		unknown,
		MoveTransactionCategoryTransactionsToDifferentTransactionCategoryVariables
	>({
		mutationFn: ({ transactionIds, newTransactionCategoryId }) =>
			moveTransactionCategoryTransactionsToDifferentTransactionCategory(
				transactionIds,
				newTransactionCategoryId
			),
		onSuccess: () => {
			// Invalidate transaction categories query
			queryClient.invalidateQueries({ queryKey: ["transactionCategories"] });

			// Invalidate accounts query
			queryClient.invalidateQueries({ queryKey: ["accounts"] });

			// Invalidate groups query
			queryClient.invalidateQueries({ queryKey: ["groups"] });

			// Invalidate admin transactions
			queryClient.invalidateQueries({ queryKey: ["users", "admin", "transactions"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return {
		moveTransactionCategoryTransactionsToDifferentTransactionCategory: mutateAsync,
		loading: isPending,
	};
};

export default useMoveTransactionCategoryTransactionsToDifferentTransactionCategory;
