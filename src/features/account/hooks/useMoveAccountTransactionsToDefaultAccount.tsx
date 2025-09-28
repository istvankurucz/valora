import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import { TransactionSelect } from "../../transaction/types/transactionTypes";
import moveAccountTransactionsToDefaultAccount from "../services/moveAccountTransactionsToDefaultAccount";

type MoveAccountTransactionsToDefaultAccountVariables = {
	transactionIds: string[];
	defaultAccountId: string;
};

const useMoveAccountTransactionsToDefaultAccount = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		TransactionSelect[],
		unknown,
		MoveAccountTransactionsToDefaultAccountVariables
	>({
		mutationFn: ({ transactionIds, defaultAccountId }) =>
			moveAccountTransactionsToDefaultAccount(transactionIds, defaultAccountId),
		onSuccess: () => {
			// Invalidate accounts query
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { moveAccountTransactionsToDefaultAccount: mutateAsync, loading: isPending };
};

export default useMoveAccountTransactionsToDefaultAccount;
