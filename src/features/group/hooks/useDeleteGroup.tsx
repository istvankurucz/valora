import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import deleteGroup from "../services/deleteGroup";

type DeleteGroupVariables = string;

const useDeleteGroup = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<void, unknown, DeleteGroupVariables>({
		mutationFn: deleteGroup,
		onSuccess: () => {
			// Invalidate groups query
			queryClient.invalidateQueries({ queryKey: ["groups"], exact: true });

			// Invalidate users query
			queryClient.invalidateQueries({ queryKey: ["users"] });

			// Invalidate transactions query
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { deleteGroup: mutateAsync, loading: isPending };
};

export default useDeleteGroup;
