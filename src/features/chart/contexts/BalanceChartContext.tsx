import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { BalanceChartData } from "../types/chartTypes";
import getBalanceChartData from "../utils/getBalanceChartData";
import { useChart } from "./ChartContext";
import { useChartNavigation } from "./ChartNavigationContext";

// Context
type BalanceChartContextType = {
	chartData: BalanceChartData;
};
const BalanceChartContext = createContext<BalanceChartContextType>({
	chartData: {} as BalanceChartData,
});

// Provider
type Props = PropsWithChildren;

export const BalanceChartProvider = ({ children }: Props) => {
	//#region States
	const [chartData, setChartData] = useState<BalanceChartData>({
		income: { value: 0 },
		expense: { value: 0 },
	});
	//#endregion

	// #region Hooks
	const { transactions } = useChart();
	const { interval, date } = useChartNavigation();

	useEffect(() => {
		// Get chart data
		const chartData = getBalanceChartData(transactions, { date, interval });

		// Update state
		setChartData(chartData);
	}, [transactions, date, interval]);
	//#endregion

	return (
		<BalanceChartContext.Provider value={{ chartData }}>{children}</BalanceChartContext.Provider>
	);
};

// Provider
export const useBalanceChartData = () => useContext(BalanceChartContext);
