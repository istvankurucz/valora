import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import updateTransaction from "../services/updateTransaction";
import { TransactionSelect, TransactionUpdate } from "../types/transactionTypes";

type UpdateTransactionVariables = {
	id: string;
	data: TransactionUpdate;
};

const useUpdateTransaction = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<
		TransactionSelect,
		unknown,
		UpdateTransactionVariables
	>({
		mutationFn: ({ id, data }) => updateTransaction(id, data),
		onSuccess: (transaction) => {
			// Invalidate queries
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { updateTransaction: mutateAsync, loading: isPending };
};

export default useUpdateTransaction;
