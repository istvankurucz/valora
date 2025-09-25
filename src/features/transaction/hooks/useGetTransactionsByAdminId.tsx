import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import { useAdminUser } from "../../user/contexts/AdminUserContext";
import getTransactionsByUserId from "../services/getTransactionsByUserId";

const useGetTransactionsByAdminId = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	const { setError } = useError();
	// #endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: admin !== null,
		queryKey: ["users", "admin", "transactions"],
		queryFn: () => getTransactionsByUserId(admin!.id),
	});
	//#endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { transactions: data ?? [], loading: isLoading };
};

export default useGetTransactionsByAdminId;
