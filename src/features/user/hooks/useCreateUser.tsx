import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import createUser from "../services/createUser";
import { UserInsert, UserSelect } from "../types/userTypes";

type CreateUserVariables = Omit<UserInsert, "admin">;

const useCreateUser = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<UserSelect, unknown, CreateUserVariables>({
		mutationFn: createUser,
		onSuccess: (user) => {
			// Invalidate users query
			queryClient.invalidateQueries({ queryKey: ["users"], exact: true });

			// Invalidate user query
			queryClient.invalidateQueries({ queryKey: ["users", user.id] });

			// Invalidate groups query
			queryClient.invalidateQueries({ queryKey: ["groups"] });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { createUser: mutateAsync, loading: isPending };
};

export default useCreateUser;
