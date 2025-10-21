import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { BalanceBreakdownChartData } from "../types/chartTypes";
import getBalanceBreakdownChartData from "../utils/getBalanceBreakdownChartData";
import { useChart } from "./ChartContext";
import { useChartNavigation } from "./ChartNavigationContext";

// Context
type BalanceBreakdownChartContextType = {
	chartData: BalanceBreakdownChartData[];
};
const BalanceBreakdownChartContext = createContext<BalanceBreakdownChartContextType>({
	chartData: [],
});

// Provider
type Props = PropsWithChildren;

export const BalanceBreakdownChartProvider = ({ children }: Props) => {
	//#region States
	const [chartData, setChartData] = useState<BalanceBreakdownChartData[]>([]);
	//#endregion

	// #region Hooks
	const { transactions } = useChart();
	const { interval, date } = useChartNavigation();

	useEffect(() => {
		// Get chart data
		const chartData = getBalanceBreakdownChartData(transactions, { date, interval });

		// Update state
		setChartData(chartData);
	}, [transactions, date, interval]);
	//#endregion

	return (
		<BalanceBreakdownChartContext.Provider value={{ chartData }}>
			{children}
		</BalanceBreakdownChartContext.Provider>
	);
};

// Provider
export const useBalanceBreakdownChartData = () => useContext(BalanceBreakdownChartContext);
