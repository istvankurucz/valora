import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import getAccount from "../services/getAccount";

const useGetAccount = () => {
	//#region Hooks
	const { accountId } = useLocalSearchParams<{ accountId?: string }>();
	const { setError } = useError();
	//#endregion

	//   #region Query
	const { data, isLoading, error } = useQuery({
		enabled: accountId !== undefined,
		queryKey: ["accounts", accountId],
		queryFn: () => getAccount(accountId!),
	});
	//#endregion

	//#region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { account: data ?? null, loading: isLoading };
};

export default useGetAccount;
