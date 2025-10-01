import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import getRecurringTransactions from "../services/getRecurringTransactions";

const useGetRecurringTransactions = () => {
	// #region Hooks
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		queryKey: ["transactions", "recurring"],
		queryFn: getRecurringTransactions,
	});
	//#endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { transactions: data ?? [], loading: isLoading };
};

export default useGetRecurringTransactions;
