import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import deleteCurrentData from "../services/deleteCurrentData";

const useDeleteCurrentData = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation({
		mutationFn: deleteCurrentData,
		onSuccess: () => {
			// Invalidate all queries
			queryClient.invalidateQueries();
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { deleteCurrentData: mutateAsync, loading: isPending };
};

export default useDeleteCurrentData;
