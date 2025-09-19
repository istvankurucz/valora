import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import createTransactionCategory from "../services/createTransactionCategory";
import {
	TransactionCategoryInsert,
	TransactionCategorySelect,
} from "../types/transactionCategoryTypes";

type CreateTransactionCategoryVariables = TransactionCategoryInsert;

const useCreateTransactionCategory = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<
		TransactionCategorySelect,
		unknown,
		CreateTransactionCategoryVariables
	>({
		mutationFn: createTransactionCategory,
		onSuccess: () => {
			// Invalidate transaction categories query
			queryClient.invalidateQueries({ queryKey: ["transactionCategories"], exact: true });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { createTransactionCategory: mutateAsync, loading: isPending };
};

export default useCreateTransactionCategory;
