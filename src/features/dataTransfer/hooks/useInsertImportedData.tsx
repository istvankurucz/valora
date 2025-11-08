import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import insertImportedData from "../services/insertImportedData";
import { DataTransferData } from "../types/dataTransferTypes";

type InsertImportedDataVariables = DataTransferData;

const useInsertImportedData = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<void, unknown, InsertImportedDataVariables>({
		mutationFn: insertImportedData,
		onSuccess: () => {
			// Invalidate all queries
			queryClient.invalidateQueries();
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { insertImportedData: mutateAsync, loading: isPending };
};

export default useInsertImportedData;
