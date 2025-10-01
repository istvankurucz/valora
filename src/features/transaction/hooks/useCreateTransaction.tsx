import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import { useAdminUser } from "../../user/contexts/AdminUserContext";
import createTransaction from "../services/createTransaction";
import { TransactionInsert, TransactionSelect } from "../types/transactionTypes";

type CreateTransactionVariables = TransactionInsert;

const useCreateTransaction = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { admin } = useAdminUser();
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
			// Invalidate recurring transactions query
			queryClient.invalidateQueries({ queryKey: ["transactions", "recurring"] });

			// Invalidate transaction categories query
			queryClient.invalidateQueries({ queryKey: ["transactionCategories"], exact: true });
			queryClient.invalidateQueries({
				queryKey: ["transactionCategories", transaction.categoryId],
			});

			// Invalidate accounts query
			if (transaction.accountId) {
				queryClient.invalidateQueries({ queryKey: ["accounts"], exact: true });
				queryClient.invalidateQueries({ queryKey: ["accounts", transaction.accountId] });
			}

			// Invalidate groups query
			if (transaction.groupId) {
				queryClient.invalidateQueries({ queryKey: ["groups"], exact: true });
				queryClient.invalidateQueries({ queryKey: ["groups", transaction.groupId] });
			}

			if (transaction.userId === admin?.id) {
				// Invalidate admin transactions query
				queryClient.invalidateQueries({ queryKey: ["users", "admin", "transactions"] });
			}
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { createTransaction: mutateAsync, loading: isPending };
};

export default useCreateTransaction;
