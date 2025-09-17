import { useMutation } from "@tanstack/react-query";
import { useError } from "../../error/contexts/ErrorContext";
import createIcon from "../services/createIcon";
import { IconInsert, IconSelect } from "../types/iconTypes";

type CreateIconVariables = IconInsert;

const useCreateIcon = () => {
	// #region Hooks
	const { setError } = useError();
	//#endregion

	// #region Mutation
	const { mutateAsync, isPending } = useMutation<IconSelect, unknown, CreateIconVariables>({
		mutationFn: createIcon,
		onError: (err) => {
			setError(err);
		},
	});
	//#endregion

	return { createIcon: mutateAsync, loading: isPending };
};

export default useCreateIcon;
