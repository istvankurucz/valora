import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import updateTransactionCategory from "../services/updateTransactionCategory";
import {
	TransactionCategorySelect,
	TransactionCategoryUpdate,
} from "../types/transactionCategoryTypes";

type UpdateTransactionCategoryVariables = {
	id: string;
	data: TransactionCategoryUpdate;
};

const useUpdateTransactionCategory = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<
		TransactionCategorySelect,
		unknown,
		UpdateTransactionCategoryVariables
	>({
		mutationFn: ({ id, data }) => updateTransactionCategory(id, data),
		onSuccess: (category) => {
			// Invalidate categorys query
			queryClient.invalidateQueries({ queryKey: ["transactionCategories"], exact: true });

			// Invalidate category query
			queryClient.invalidateQueries({ queryKey: ["transactionCategories", category.id] });

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

	return { updateTransactionCategory: mutateAsync, loading: isPending };
};

export default useUpdateTransactionCategory;
