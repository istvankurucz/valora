import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import deleteTransactionsByCategoryId from "../services/deleteTransactionsByCategoryId";

type DeleteTransactionsByCategoryIdVariables = string;

const useDeleteTransactionsByCategoryId = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		void,
		unknown,
		DeleteTransactionsByCategoryIdVariables
	>({
		mutationFn: deleteTransactionsByCategoryId,
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

	return { deleteTransactionsByCategoryId: mutateAsync, loading: isPending };
};

export default useDeleteTransactionsByCategoryId;
