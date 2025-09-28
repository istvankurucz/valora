import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import updateGroup from "../services/updateGroup";
import { GroupSelect, GroupUpdate } from "../types/groupTypes";

type UpdateGroupVariables = {
	id: string;
	data: GroupUpdate;
};

const useUpdateGroup = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<GroupSelect, unknown, UpdateGroupVariables>({
		mutationFn: ({ id, data }) => updateGroup(id, data),
		onSuccess: (group) => {
			// Invalidate groups query
			queryClient.invalidateQueries({ queryKey: ["groups"], exact: true });

			// Invalidate group query
			queryClient.invalidateQueries({ queryKey: ["groups", group.id] });

			// Invalidate users query
			queryClient.invalidateQueries({ queryKey: ["users"] });

			// Invalidate transactions query
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { updateGroup: mutateAsync, loading: isPending };
};

export default useUpdateGroup;
