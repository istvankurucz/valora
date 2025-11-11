import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import createAdminPreferences from "../services/createAdminPreferences";
import { AdminPreferencesInsert, AdminPreferencesSelect } from "../types/userTypes";

type CreateAdminPreferencesVariables = AdminPreferencesInsert;

const useCreateAdminPreferences = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	//#region Mutation
	const { mutateAsync, isPending } = useMutation<
		AdminPreferencesSelect,
		unknown,
		CreateAdminPreferencesVariables
	>({
		mutationFn: createAdminPreferences,
		onSuccess: () => {
			// Invalidate admin user query
			queryClient.invalidateQueries({ queryKey: ["users", "admin"], exact: true });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { createAdminPreferences: mutateAsync, loading: isPending };
};

export default useCreateAdminPreferences;
