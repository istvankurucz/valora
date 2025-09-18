import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import createGroup from "../services/createGroup";
import { GroupInsert, GroupSelect } from "../types/groupTypes";

type CreateGroupVariables = GroupInsert;

const useCreateGroup = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<GroupSelect, unknown, CreateGroupVariables>({
		mutationFn: createGroup,
		onSuccess: () => {
			// Invalidate groups query
			queryClient.invalidateQueries({ queryKey: ["groups"], exact: true });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { createGroup: mutateAsync, loading: isPending };
};

export default useCreateGroup;
