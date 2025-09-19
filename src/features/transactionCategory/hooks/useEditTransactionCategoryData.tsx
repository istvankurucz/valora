import { useEffect } from "react";
import useFormData from "../../form/hooks/useFormData";
import { EDIT_TRANSACTION_CATEGORY_FORM_DATA } from "../constants/formData";
import { useTransactionCategory } from "../contexts/TransactionCategoryContext";

const useEditTransactionCategoryData = () => {
	// #region States
	const { data, setData, updateData } = useFormData(EDIT_TRANSACTION_CATEGORY_FORM_DATA);
	//#endregion

	// #region Hooks
	const { transactionCategory } = useTransactionCategory();
	//#endregion

	useEffect(() => {
		if (!transactionCategory) return;

		setData({
			type: transactionCategory.type,
			name: transactionCategory.name,
			icon: transactionCategory.icon.name,
			foregroundColor: transactionCategory.icon.foregroundColor,
			backgroundColor: transactionCategory.icon.backgroundColor,
		});
	}, [transactionCategory, setData]);

	return { data, setData, updateData };
};

export default useEditTransactionCategoryData;
