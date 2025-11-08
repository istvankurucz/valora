import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import addUsersToGroup from "../services/addUsersToGroup";
import { GroupUserSelect } from "../types/groupTypes";

type AddUsersToGroupVariables = {
	groupId: string;
	userIds: string[];
};

const useAddUsersToGroup = () => {
	// #regions Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<
		GroupUserSelect[],
		unknown,
		AddUsersToGroupVariables
	>({
		mutationFn: ({ groupId, userIds }) => addUsersToGroup(groupId, userIds),
		onSuccess: (_, { groupId, userIds }) => {
			// Invalidate groups query
			queryClient.invalidateQueries({ queryKey: ["groups"], exact: true });

			// Invalidate group query
			queryClient.invalidateQueries({ queryKey: ["groups", groupId] });

			// Invalidate users query
			queryClient.invalidateQueries({ queryKey: ["users"], exact: true });

			// Invalidate query of each user
			userIds.forEach((userId) =>
				queryClient.invalidateQueries({ queryKey: ["users", userId] })
			);
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { addUsersToGroup: mutateAsync, loading: isPending };
};

export default useAddUsersToGroup;
