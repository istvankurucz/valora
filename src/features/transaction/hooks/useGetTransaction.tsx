import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import getTransaction from "../services/getTransaction";

const useGetTransaction = () => {
	//   #region Hooks
	const { transactionId } = useLocalSearchParams<{ transactionId?: string }>();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: transactionId !== undefined,
		queryKey: ["transactions", transactionId],
		queryFn: () => getTransaction(transactionId!),
	});
	//#endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { transaction: data ?? null, loading: isLoading };
};

export default useGetTransaction;
