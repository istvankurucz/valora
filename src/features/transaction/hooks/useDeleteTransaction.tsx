import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import deleteTransaction from "../services/deleteTransaction";

type DeleteTransactionVariables = string;

const useDeleteTransaction = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<void, unknown, DeleteTransactionVariables>({
		mutationFn: deleteTransaction,
		onSuccess: () => {
			// Invalidate transaction categories query
			queryClient.invalidateQueries({ queryKey: ["transactionCategories"] });

			// Invalidate accounts query
			queryClient.invalidateQueries({ queryKey: ["accounts"] });

			// Invalidate groups query
			queryClient.invalidateQueries({ queryKey: ["groups"] });

			// Invalidate admin transactions query
			queryClient.invalidateQueries({ queryKey: ["users", "admin", "transactions"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { deleteTransaction: mutateAsync, loading: isPending };
};

export default useDeleteTransaction;
