import { useMemo, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Transaction } from "../types/transactionTypes";
import getTransactionsSectionData from "../utils/getTransactionsSectionData";

const SIZE = 10;

function useTransactionsSection(transactions: Transaction[]) {
	// #region States
	const [page, setPage] = useState(1);
	//#endregion

	// #region Refs
	const disabled = useRef<boolean>(false);
	// #endregion

	// #region Constants
	const sectionsData = useMemo(() => {
		const transactionLimit = page * SIZE;
		return getTransactionsSectionData(transactions, transactionLimit);
	}, [transactions, page]);
	//#endregion

	// #region Functions
	function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
		if (disabled.current) return;

		const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
		const isCloseToBottom =
			layoutMeasurement.height + contentOffset.y >= contentSize.height - 400;

		if (isCloseToBottom && (page + 1) * SIZE < transactions.length) {
			setPage((prevPage) => prevPage + 1);
			disabled.current = true;

			setTimeout(() => {
				disabled.current = false;
			}, 500);
		}
	}
	//#endregion

	return { sectionsData, handleScroll };
}

export default useTransactionsSection;
