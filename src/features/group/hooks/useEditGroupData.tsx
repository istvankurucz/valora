import { useEffect } from "react";
import useFormData from "../../form/hooks/useFormData";
import { EDIT_GROUP_FORM_DATA } from "../constants/formData";
import { useGroup } from "../contexts/GroupContext";

const useEditGroupData = () => {
	// #region States
	const { data, setData, updateData } = useFormData(EDIT_GROUP_FORM_DATA);
	//#endregion

	// #region Hooks
	const { group } = useGroup();
	//#endregion

	useEffect(() => {
		if (!group) return;

		setData({
			name: group.name,
			icon: group.icon.name,
			foregroundColor: group.icon.foregroundColor,
			backgroundColor: group.icon.backgroundColor,
		});
	}, [group, setData]);

	return { data, setData, updateData };
};

export default useEditGroupData;
