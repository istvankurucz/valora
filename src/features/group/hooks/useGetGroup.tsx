import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import getGroup from "../services/getGroup";

const useGetGroup = () => {
	//#region Hooks
	const { groupId } = useLocalSearchParams<{ groupId?: string }>();
	const { setError } = useError();
	//#endregion

	//   #region Query
	const { data, isLoading, error } = useQuery({
		enabled: groupId !== undefined,
		queryKey: ["groups", groupId],
		queryFn: () => getGroup(groupId!),
	});
	//#endregion

	//#region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return { group: data ?? null, loading: isLoading };
};

export default useGetGroup;
