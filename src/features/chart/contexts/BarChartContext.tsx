import { addDays, addMonths, addWeeks, addYears } from "date-fns";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import Chart from "../components/layout/Chart";
import { CHART_INTERVAL_OPTIONS, ChartInterval } from "../constants/chartIntervalOptions";
import { BarChartData } from "../types/chartTypes";
import shouldDisableNextButton from "../utils/shouldDisableNextButton";
import shouldDisablePrevButton from "../utils/shouldDisablePrevButton";

// Context
type BarChartContextType = {
	chartData: BarChartData;
	interval: ChartInterval;
	setInterval: Dispatch<SetStateAction<ChartInterval>>;
	date: Date;
	setDate: Dispatch<SetStateAction<Date>>;
	navigate: (direction: number) => void;
	disableNextButton: boolean;
	disablePrevButton: boolean;
	selectedIndex: number | null;
	setSelectedIndex: Dispatch<SetStateAction<number | null>>;
	defaultLabel?: string;
	useTypeAsLabel?: boolean;
};
const BarChartContext = createContext<BarChartContextType>({
	chartData: { groups: [] },
	interval: CHART_INTERVAL_OPTIONS[0],
	setInterval: () => {},
	date: new Date(),
	setDate: () => {},
	navigate: () => {},
	disableNextButton: false,
	disablePrevButton: false,
	selectedIndex: null,
	setSelectedIndex: () => {},
	defaultLabel: undefined,
	useTypeAsLabel: undefined,
});

// Provider
type Props = {
	getChartData: ({ interval, date }: { interval: ChartInterval; date: Date }) => BarChartData;
	firstTransactionDate: Date;
	defaultInterval?: ChartInterval;
	defaultLabel?: string;
	useTypeAsLabel?: boolean;
	children?: ReactNode;
};
export const BarChartProvider = ({
	getChartData,
	firstTransactionDate,
	defaultInterval,
	defaultLabel,
	useTypeAsLabel,
	children,
}: Props) => {
	//#region States
	const [chartData, setChartData] = useState<BarChartData>({ groups: [] });
	const [interval, setInterval] = useState<ChartInterval>(
		defaultInterval ?? CHART_INTERVAL_OPTIONS[1]
	);
	const [date, setDate] = useState(new Date());
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	//#endregion

	// #region Hooks
	useEffect(() => {
		// Recalcalculate chart data when date or interval change
		const chartData = getChartData({ interval, date });

		// Update chart data state
		setChartData(chartData);
	}, [date, interval, getChartData]);
	//#endregion

	// #region Constants
	const disablePrevButton = shouldDisablePrevButton(date, { interval, firstTransactionDate });
	const disableNextButton = shouldDisableNextButton(date, { interval });
	//#endregion

	// #region Functions
	function navigate(direction: number) {
		setDate((date) => {
			switch (interval) {
				case "day":
					return addDays(date, direction);
				case "week":
					return addWeeks(date, direction);
				case "month":
					return addMonths(date, direction);
				case "year":
					return addYears(date, direction);
				case "all":
					return date;
			}
		});
	}
	//#endregion

	return (
		<BarChartContext.Provider
			value={{
				chartData,
				interval,
				setInterval,
				date,
				setDate,
				navigate,
				disablePrevButton,
				disableNextButton,
				selectedIndex,
				setSelectedIndex,
				defaultLabel,
				useTypeAsLabel,
			}}
		>
			<Chart />
			{children}
		</BarChartContext.Provider>
	);
};

// Hook
export const useBarChart = () => useContext(BarChartContext);
