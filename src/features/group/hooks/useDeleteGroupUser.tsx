import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import deleteGroupUser from "../services/deleteGroupUser";

type DeleteGroupUserVariables = {
	groupId: string;
	userId: string;
};

const useDeleteGroupUser = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<void, unknown, DeleteGroupUserVariables>({
		mutationFn: deleteGroupUser,
		onSuccess: (_, { userId, groupId }) => {
			// Invalidate users query
			queryClient.invalidateQueries({ queryKey: ["users"], exact: true });

			// Invalidate user query
			queryClient.invalidateQueries({ queryKey: ["users", userId] });

			// Invalidate groups query
			queryClient.invalidateQueries({ queryKey: ["groups"], exact: true });

			// Invalidate group query
			queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { deleteGroupUser: mutateAsync, loading: isPending };
};

export default useDeleteGroupUser;
