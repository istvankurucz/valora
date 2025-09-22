import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import getUser from "../services/getUser";

const useGetUser = () => {
	// #region Hooks
	const { userId } = useLocalSearchParams<{ userId?: string }>();
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: userId !== undefined,
		queryKey: ["users", userId],
		queryFn: () => getUser(userId!),
	});
	//#endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { user: data ?? null, loading: isLoading };
};

export default useGetUser;
