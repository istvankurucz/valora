import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import unsetDefaultAccount from "../services/unsetDefaultAccount";
import { AccountSelect } from "../types/accountTypes";

const useUnsetDefaultAccount = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<AccountSelect, unknown>({
		mutationFn: unsetDefaultAccount,
		onSuccess: (account) => {
			// Invalidate accounts query
			queryClient.invalidateQueries({ queryKey: ["accounts"], exact: true });

			// Invalidate account query
			queryClient.invalidateQueries({ queryKey: ["accounts", account.id] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { unsetDefaultAccount: mutateAsync, loading: isPending };
};

export default useUnsetDefaultAccount;
