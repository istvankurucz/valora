import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import getGroups from "../services/getGroups";

const useGetGroups = () => {
	// #region Hooks
	const { setError } = useError();
	//#endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		queryKey: ["groups"],
		queryFn: getGroups,
	});
	//#endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { groups: data ?? [], loading: isLoading };
};

export default useGetGroups;
