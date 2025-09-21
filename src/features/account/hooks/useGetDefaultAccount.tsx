import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import getDefaultAccount from "../services/getDefaultAccount";

const useGetDefaultAccount = () => {
	// #region Hooks
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		queryKey: ["accounts", "default"],
		queryFn: getDefaultAccount,
	});
	//#endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { account: data ?? null, loading: isLoading };
};

export default useGetDefaultAccount;
