import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import updateAccount from "../services/updateAccount";
import { AccountSelect, AccountUpdate } from "../types/accountTypes";

type UpdateAccountVariables = {
	id: string;
	data: AccountUpdate;
};

const useUpdateAccount = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<AccountSelect, unknown, UpdateAccountVariables>({
		mutationFn: ({ id, data }) => updateAccount(id, data),
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

	return { updateAccount: mutateAsync, loading: isPending };
};

export default useUpdateAccount;
