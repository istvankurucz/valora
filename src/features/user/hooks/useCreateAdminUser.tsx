import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import createAdminUser from "../services/createAdminUser";
import { UserSelect } from "../types/userTypes";

type CreateAdminUserVariables = {
	name: string;
};

const useCreateAdminUser = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<UserSelect, unknown, CreateAdminUserVariables>({
		mutationFn: createAdminUser,
		onSuccess: (admin) => {
			// Update admin user query
			queryClient.setQueryData(["users", "admin"], admin);
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { createAdminUser: mutateAsync, loading: isPending };
};

export default useCreateAdminUser;
