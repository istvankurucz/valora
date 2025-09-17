import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import createAccount from "../services/createAccount";
import { AccountInsert, AccountSelect } from "../types/accountTypes";

type CreateAccountVariables = AccountInsert;

const useCreateAccount = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<AccountSelect, unknown, CreateAccountVariables>({
		mutationFn: createAccount,
		onSuccess: () => {
			// Invalidate accounts query
			queryClient.invalidateQueries({ queryKey: ["accounts"], exact: true });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { createAccount: mutateAsync, loading: isPending };
};

export default useCreateAccount;
