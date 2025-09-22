import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import deleteGroupsByUserId from "../services/deleteGroupsByUserId";

type DeleteGroupsByUserIdVariables = string;

const useDeleteGroupsByUserId = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<void, unknown, DeleteGroupsByUserIdVariables>({
		mutationFn: deleteGroupsByUserId,
		onSuccess: () => {
			// Invalidate users query
			queryClient.invalidateQueries({ queryKey: ["users"] });

			// Invalidate all groups query
			queryClient.invalidateQueries({ queryKey: ["groups"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { deleteGroupsByUserId: mutateAsync, loading: isPending };
};

export default useDeleteGroupsByUserId;
