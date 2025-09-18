import { useEffect } from "react";
import useFormData from "../../form/hooks/useFormData";
import { EDIT_ACCOUNT_FORM_DATA } from "../constants/formData";
import { useAccount } from "../contexts/AccountContext";

const useEditAccountData = () => {
	// #region States
	const { data, setData, updateData } = useFormData(EDIT_ACCOUNT_FORM_DATA);
	//#endregion

	// #region Hooks
	const { account } = useAccount();
	//#endregion

	useEffect(() => {
		if (!account) return;

		setData({
			name: account.name,
			default: account.default,
			icon: account.icon.name,
			foregroundColor: account.icon.foregroundColor,
			backgroundColor: account.icon.backgroundColor,
		});
	}, [account, setData]);

	return { data, setData, updateData };
};

export default useEditAccountData;
