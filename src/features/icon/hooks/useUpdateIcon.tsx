import { useMutation } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import updateIcon from "../services/updateIcon";
import { IconSelect, IconUpdate } from "../types/iconTypes";

type UpdateIconVariables = {
	id: string;
	data: IconUpdate;
};

const useUpdateIcon = () => {
	// #region Hooks
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<IconSelect, unknown, UpdateIconVariables>({
		mutationFn: ({ id, data }) => updateIcon(id, data),
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { updateIcon: mutateAsync, loading: isPending };
};

export default useUpdateIcon;
