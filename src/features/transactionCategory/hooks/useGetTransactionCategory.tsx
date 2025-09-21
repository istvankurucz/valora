import { useQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import getTransactionCategory from "../services/getTransactionCategory";

const useGetTransactionCategory = () => {
	// #region Hooks
	const { transactionCategoryId } = useGlobalSearchParams<{ transactionCategoryId?: string }>();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: transactionCategoryId !== undefined,
		queryKey: ["transactionCategories", transactionCategoryId],
		queryFn: () => getTransactionCategory(transactionCategoryId!),
	});
	//#endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { transactionCategory: data ?? null, loading: isLoading };
};

export default useGetTransactionCategory;
