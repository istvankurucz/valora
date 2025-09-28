import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import deleteTransactionCategory from "../services/deleteTransactionCategory";

type DeleteTransactionCategoryVariables = string;

const useDeleteTransactionCategory = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		void,
		unknown,
		DeleteTransactionCategoryVariables
	>({
		mutationFn: deleteTransactionCategory,
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

	return { deleteTransactionCategory: mutateAsync, loading: isPending };
};

export default useDeleteTransactionCategory;
