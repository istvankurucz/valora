import { useEffect } from "react";
import useFormData from "../../form/hooks/useFormData";
import { EDIT_ACCOUNT_FORM_DATA } from "../constants/formData";
import { useAdminUser } from "../contexts/AdminUserContext";

const useEditAccountFormData = () => {
	// #region Hooks
	const { data, setData, updateData } = useFormData(EDIT_ACCOUNT_FORM_DATA);
	const { admin } = useAdminUser();
	//#endregion

	useEffect(() => {
		if (!admin) return;

		setData({
			name: admin.name,
			currency: admin.preferences.currency,
		});
	}, [admin, setData]);

	return { data, setData, updateData };
};

export default useEditAccountFormData;
