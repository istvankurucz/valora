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
		onSuccess: () => {},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { deleteTransactionsByCategoryId: mutateAsync, loading: isPending };
};

export default useDeleteTransactionsByCategoryId;
