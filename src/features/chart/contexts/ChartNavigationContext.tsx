import { addDays, addMonths, addWeeks, addYears } from "date-fns";
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { CHART_INTERVAL_OPTIONS, ChartInterval } from "../constants/chartIntervalOptions";
import shouldDisableNextButton from "../utils/shouldDisableNextButton";
import shouldDisablePrevButton from "../utils/shouldDisablePrevButton";
import { useChart } from "./ChartContext";

// Context
type ChartNavigationContextType = {
	interval: ChartInterval;
	setInterval: Dispatch<SetStateAction<ChartInterval>>;
	date: Date;
	setDate: Dispatch<SetStateAction<Date>>;
	navigate: (direction: number) => void;
	disableNextButton: boolean;
	disablePrevButton: boolean;
};
const ChartNavigationContext = createContext<ChartNavigationContextType>({
	interval: CHART_INTERVAL_OPTIONS[0],
	setInterval: () => {},
	date: new Date(),
	setDate: () => {},
	navigate: () => {},
	disableNextButton: false,
	disablePrevButton: false,
});

// Provider
type Props = PropsWithChildren;

export const ChartNavigationProvider = ({ children }: Props) => {
	// #region States
	const [interval, setInterval] = useState<ChartInterval>(CHART_INTERVAL_OPTIONS[2]);
	const [date, setDate] = useState(new Date());
	//#endregion

	// #region Hooks
	const { transactions } = useChart();
	// const { transactions } = useBarChart();
	//#endregion

	// #region Constants
	const disablePrevButton = shouldDisablePrevButton(date, { interval, transactions });
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
		<ChartNavigationContext.Provider
			value={{
				interval,
				setInterval,
				date,
				setDate,
				navigate,
				disablePrevButton,
				disableNextButton,
			}}
		>
			{children}
		</ChartNavigationContext.Provider>
	);
};

// Hook
export const useChartNavigation = () => useContext(ChartNavigationContext);
