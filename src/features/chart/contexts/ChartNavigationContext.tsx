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

// Context
type ChartNavigationContextType = {
	interval: ChartInterval;
	setInterval: Dispatch<SetStateAction<ChartInterval>>;
	date: Date;
	setDate: Dispatch<SetStateAction<Date>>;
	navigate: (direction: number) => void;
};
const ChartNavigationContext = createContext<ChartNavigationContextType>({
	interval: CHART_INTERVAL_OPTIONS[0],
	setInterval: () => {},
	date: new Date(),
	setDate: () => {},
	navigate: () => {},
});

// Provider
type Props = PropsWithChildren;

export const ChartNavigationProvider = ({ children }: Props) => {
	// #region States
	const [interval, setInterval] = useState<ChartInterval>(CHART_INTERVAL_OPTIONS[2]);
	const [date, setDate] = useState(new Date());
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
		<ChartNavigationContext.Provider value={{ interval, setInterval, date, setDate, navigate }}>
			{children}
		</ChartNavigationContext.Provider>
	);
};

// Hook
export const useChartNavigation = () => useContext(ChartNavigationContext);
