import { addDays, addMonths, addWeeks, addYears } from "date-fns";
import {
	createContext,
	Dispatch,
	ReactNode,
	RefObject,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { ScrollView } from "react-native-gesture-handler";
import Chart from "../components/layout/Chart";
import { CHART_INTERVAL_OPTIONS, ChartInterval } from "../constants/chartIntervalOptions";
import { BarChartData } from "../types/chartTypes";
import getIntervalBreakdownChartScrollIndex from "../utils/getIntervalBreakdownChartScrollIndex";
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
	barsContainerRef: RefObject<ScrollView | null>;
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
	barsContainerRef: { current: null },
});

// Provider
const GROUP_GAP = 24;
const BAR_WIDTH = 24;
const BAR_GAP = 8;

type Props = {
	getChartData: ({ interval, date }: { interval: ChartInterval; date: Date }) => BarChartData;
	firstTransactionDate: Date;
	defaultInterval?: ChartInterval;
	defaultLabel?: string;
	useTypeAsLabel?: boolean;
	autoScroll?: boolean;
	scrollOffset?: number;
	children?: ReactNode;
};

export const BarChartProvider = ({
	getChartData,
	firstTransactionDate,
	defaultInterval,
	defaultLabel,
	useTypeAsLabel,
	autoScroll,
	scrollOffset = 0,
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

	// #region Refs
	const barsContainerRef = useRef<ScrollView>(null);
	//#endregion

	// #region Hooks
	useEffect(() => {
		// Recalcalculate chart data when date or interval change
		const chartData = getChartData({ interval, date });

		// Update chart data state
		setChartData(chartData);
	}, [date, interval, getChartData]);

	useEffect(() => {
		// Check if auto scroll is enabled
		if (!autoScroll) return;

		// Initialize scroll position
		let x = 0;

		// Calculate scroll position
		const scrollIndex = Math.min(
			getIntervalBreakdownChartScrollIndex(interval),
			Math.max(chartData.groups.length - 1, 0)
		);
		for (let i = 0; i < scrollIndex + scrollOffset; i++) {
			// Get group data
			const group = chartData.groups[i];
			if (!group) return;

			// Update scroll position
			x += group.bars.length * BAR_WIDTH + (group.bars.length - 1) * BAR_GAP + GROUP_GAP;
		}

		// Scroll to calculated position
		barsContainerRef.current?.scrollTo({ x, animated: true });
	}, [chartData, autoScroll, scrollOffset, interval]);
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
				barsContainerRef,
			}}
		>
			<Chart />
			{children}
		</BarChartContext.Provider>
	);
};

// Hook
export const useBarChart = () => useContext(BarChartContext);
