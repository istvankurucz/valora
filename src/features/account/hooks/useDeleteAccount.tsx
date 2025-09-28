import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import deleteAccount from "../services/deleteAccount";

type DeleteAccountVariables = string;

const useDeleteAccount = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<void, unknown, DeleteAccountVariables>({
		mutationFn: deleteAccount,
		onSuccess: () => {
			// Invalidate accounts query
			queryClient.invalidateQueries({ queryKey: ["accounts"] });

			// Invalidate transactions query
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { deleteAccount: mutateAsync, loading: isPending };
};

export default useDeleteAccount;
