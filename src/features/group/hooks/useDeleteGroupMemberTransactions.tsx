import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import deleteGroupMemberTransactions from "../services/deleteGroupMemberTransactions";

type DeleteGroupMemberTransactionsVariables = {
	groupId: string;
	adminId: string;
};

const useDeleteGroupMemberTransactions = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		void,
		unknown,
		DeleteGroupMemberTransactionsVariables
	>({
		mutationFn: deleteGroupMemberTransactions,
		onSuccess: () => {},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { deleteGroupMemberTransactions: mutateAsync, loading: isPending };
};

export default useDeleteGroupMemberTransactions;
