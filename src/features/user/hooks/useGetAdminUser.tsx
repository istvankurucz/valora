import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import getAdminUser from "../services/getAdminUser";

const useGetAdminUser = () => {
	// #region Hooks
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		queryKey: ["users", "admin"],
		queryFn: getAdminUser,
	});
	//#endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { admin: data ?? null, loading: isLoading };
};

export default useGetAdminUser;
