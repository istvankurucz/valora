import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import deleteTransactionsByUserIdAndGroupId from "../services/deleteTransactionsByUserIdAndGroupId";

type DeleteTransactionsByUserIdAndGroupIdVariables = {
	userId: string;
	groupId: string;
};

const useDeleteTransactionsByUserIdAndGroupId = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		void,
		unknown,
		DeleteTransactionsByUserIdAndGroupIdVariables
	>({
		mutationFn: deleteTransactionsByUserIdAndGroupId,
		onSuccess: () => {
			// Invalidate all groups query
			queryClient.invalidateQueries({ queryKey: ["groups"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { deleteTransactionsByUserIdAndGroupId: mutateAsync, loading: isPending };
};

export default useDeleteTransactionsByUserIdAndGroupId;
