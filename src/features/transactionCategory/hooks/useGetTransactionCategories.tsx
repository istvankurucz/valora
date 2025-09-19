import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import getTransactionCategories from "../services/getTransactionCategories";

const useGetTransactionCategories = () => {
	// #region Hooks
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		queryKey: ["transactionCategories"],
		queryFn: getTransactionCategories,
	});
	//#endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { transactionCategories: data ?? [], loading: isLoading };
};

export default useGetTransactionCategories;
