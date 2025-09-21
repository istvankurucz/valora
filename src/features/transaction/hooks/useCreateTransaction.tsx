import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import createTransaction from "../services/createTransaction";
import { TransactionInsert, TransactionSelect } from "../types/transactionTypes";

type CreateTransactionVariables = TransactionInsert;

const useCreateTransaction = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		TransactionSelect,
		unknown,
		CreateTransactionVariables
	>({
		mutationFn: createTransaction,
		onSuccess: (transaction) => {
			// Invalidate accounts query
			queryClient.invalidateQueries({ queryKey: ["accounts"], exact: true });
			queryClient.invalidateQueries({ queryKey: ["accounts", transaction.accountId] });

			// Invalidate groups query
			queryClient.invalidateQueries({ queryKey: ["groups"], exact: true });
			queryClient.invalidateQueries({ queryKey: ["groups", transaction.groupId] });

			// Invalidate transaction categories query
			queryClient.invalidateQueries({ queryKey: ["transactionCategories"], exact: true });
			queryClient.invalidateQueries({
				queryKey: ["transactionCategories", transaction.categoryId],
			});
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { createTransaction: mutateAsync, loading: isPending };
};

export default useCreateTransaction;
