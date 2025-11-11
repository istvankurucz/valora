import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import updateUser from "../services/updateUser";
import { UserSelect, UserUpdate } from "../types/userTypes";

type UpdateUserVariables = {
	id: string;
	data: UserUpdate;
};

const useUpdateUser = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<UserSelect, unknown, UpdateUserVariables>({
		mutationFn: ({ id, data }) => updateUser(id, data),
		onSuccess: (user) => {
			// Invalidate users query
			queryClient.invalidateQueries({ queryKey: ["users"], exact: true });

			// Invalidate user query
			queryClient.invalidateQueries({ queryKey: ["users", user.id] });

			// Invalidate all groups query
			queryClient.invalidateQueries({ queryKey: ["groups"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { updateUser: mutateAsync, loading: isPending };
};

export default useUpdateUser;
