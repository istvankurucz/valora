import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import { useAdminUser } from "../../user/contexts/AdminUserContext";
import getTransactionCategories from "../services/getTransactionCategories";

const useGetTransactionCategories = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: admin !== null,
		queryKey: ["transactionCategories"],
		queryFn: () => getTransactionCategories(admin!.id),
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
