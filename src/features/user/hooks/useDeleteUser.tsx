import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import deleteUser from "../services/deleteUser";

type DeleteUserVariables = string;

const useDeleteUser = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<void, unknown, DeleteUserVariables>({
		mutationFn: deleteUser,
		onSuccess: () => {
			// Invalidate users query
			queryClient.invalidateQueries({ queryKey: ["users"], exact: true });

			// Invalidate all groups query
			queryClient.invalidateQueries({ queryKey: ["groups"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { deleteUser: mutateAsync, loading: isPending };
};

export default useDeleteUser;
