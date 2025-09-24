import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import useThemeColor from "@/src/hooks/useThemeColor";
import { BarChartPropsType } from "react-native-gifted-charts";

const useBarChartProps = () => {
	//#region Hooks
	const textColor = useThemeColor({ variant: "neutral", shade: 800 });
	const frontColor = useThemeColor({ variant: "neutral", shade: 600 });
	const gradientColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	//#region Constants
	const props: BarChartPropsType = {
		showGradient: true,
		frontColor: frontColor,
		gradientColor: gradientColor,
		barBorderRadius: BORDER_RADIUS[999],
		xAxisLabelTextStyle: { color: textColor },
		yAxisTextStyle: { color: textColor },
		xAxisThickness: 0,
		yAxisThickness: 0,
		disableScroll: true,
		isAnimated: true,
	};
	//#endregion

	return props;
};

export default useBarChartProps;
