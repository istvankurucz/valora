import { useQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import { useAdminUser } from "../../user/contexts/AdminUserContext";
import getTransactionCategory from "../services/getTransactionCategory";

const useGetTransactionCategory = () => {
	// #region Hooks
	const { transactionCategoryId } = useGlobalSearchParams<{ transactionCategoryId?: string }>();
	const { admin } = useAdminUser();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: transactionCategoryId !== undefined && admin !== null,
		queryKey: ["transactionCategories", transactionCategoryId],
		queryFn: () => getTransactionCategory(transactionCategoryId!, { adminId: admin!.id }),
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
