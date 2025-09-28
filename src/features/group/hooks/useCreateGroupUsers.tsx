import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import createGroupUsers from "../services/createGroupUsers";
import { GroupUserSelect } from "../types/groupTypes";

type CreateGroupUsersVariables = {
	groupId: string;
	userIds: string[];
};

const useCreateGroupUsers = () => {
	// #regions Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<
		GroupUserSelect[],
		unknown,
		CreateGroupUsersVariables
	>({
		mutationFn: ({ groupId, userIds }) => createGroupUsers(groupId, userIds),
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

	return { createGroupUsers: mutateAsync, loading: isPending };
};

export default useCreateGroupUsers;
