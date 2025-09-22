import { useEffect } from "react";
import useFormData from "../../form/hooks/useFormData";
import { EDIT_USER_FORM_DATA } from "../constants/formData";
import { useUser } from "../contexts/UserContext";

const useEditUserData = () => {
	// #region States
	const { data, setData, updateData } = useFormData(EDIT_USER_FORM_DATA);
	//#endregion

	// #region Hooks
	const { user } = useUser();
	//#endregion

	useEffect(() => {
		if (!user) return;

		setData({ name: user.name });
	}, [user, setData]);

	return { data, setData, updateData };
};

export default useEditUserData;
