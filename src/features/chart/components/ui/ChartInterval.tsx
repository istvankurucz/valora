import SegmentedControl, {
	SegmentedControlProps,
} from "@/src/components/form/SegmentedControl/SegmentedControl";
import { SegmentedControlOption } from "@/src/types/uiTypes";
import capitalizeString from "@/src/utils/string/capitalizeString";
import {
	CHART_INTERVAL_OPTIONS,
	ChartInterval as ChartIntervalType,
} from "../../constants/chartIntervalOptions";
import { useBarChart } from "../../contexts/BarChartContext";

type Props = Omit<SegmentedControlProps<ChartIntervalType>, "options">;

const ChartInterval = ({ value, onValueChange, ...rest }: Props) => {
	// #region Hooks
	// const { interval, setInterval } = useChartNavigation();
	const { interval, setInterval } = useBarChart();
	//#endregion

	// #region Constants
	const OPTIONS: SegmentedControlOption<ChartIntervalType>[] = CHART_INTERVAL_OPTIONS.map(
		(option) => ({
			value: option,
			label: capitalizeString(option),
		})
	);
	//#endregion

	return (
		<SegmentedControl
			shade={200}
			options={OPTIONS}
			value={interval}
			onValueChange={setInterval}
			{...rest}
		/>
	);
};

export default ChartInterval;
