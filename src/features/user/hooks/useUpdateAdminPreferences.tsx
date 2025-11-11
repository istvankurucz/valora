import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import updateAdminPreferences from "../services/updateAdminPreferences";
import { AdminPreferencesSelect, AdminPreferencesUpdate } from "../types/userTypes";

type UpdateAdminPreferencesVariables = AdminPreferencesUpdate;

const useUpdateAdminPreferences = () => {
	// #region Hooks
	const queryClient = useQueryClient();
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<
		AdminPreferencesSelect,
		unknown,
		UpdateAdminPreferencesVariables
	>({
		mutationFn: updateAdminPreferences,
		onSuccess: () => {
			// Invalidate admin query
			queryClient.invalidateQueries({ queryKey: ["users", "admin"], exact: true });
		},
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { updateAdminPreferences: mutateAsync, loading: isPending };
};

export default useUpdateAdminPreferences;
