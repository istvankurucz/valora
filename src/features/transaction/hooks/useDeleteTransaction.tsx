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
			// Invalidate accounts query
			queryClient.invalidateQueries({ queryKey: ["accounts"] });

			// Invalidate groups query
			queryClient.invalidateQueries({ queryKey: ["groups"] });

			// Invalidate users query
			queryClient.invalidateQueries({ queryKey: ["users"] });

			// Invalidate transaction categories query
			queryClient.invalidateQueries({ queryKey: ["transactionCategories"] });

			// Invalidate transactions query
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { deleteTransaction: mutateAsync, loading: isPending };
};

export default useDeleteTransaction;
