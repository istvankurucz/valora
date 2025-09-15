import { useCallback, useState } from "react";

const useFormData = <T,>(initialData: T) => {
	//#region States
	const [data, setData] = useState(initialData);
	//#endregion

	//#region Functions
	const updateData = useCallback((newData: Partial<T>) => {
		setData((data) => ({ ...data, ...newData }));
	}, []);
	//#endregion

	return { data, setData, updateData };
};

export default useFormData;
