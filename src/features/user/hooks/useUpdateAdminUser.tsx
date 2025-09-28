import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import updateAdminUser from "../services/updateAdminUser";
import { AdminUserUpdate, UserSelect } from "../types/userTypes";

type UpdateAdminUserVariables = AdminUserUpdate;

const useUpdateAdminUser = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<UserSelect, unknown, UpdateAdminUserVariables>({
		mutationFn: updateAdminUser,
		onSuccess: () => {
			// Invalidate all queries
			queryClient.invalidateQueries();
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { updateAdminUser: mutateAsync, loading: isPending };
};

export default useUpdateAdminUser;
