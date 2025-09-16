import { useEffect } from "react";
import { SharedValue, withTiming } from "react-native-reanimated";

type Props<T = string> = {
	borderColor: SharedValue<string>;
	inputBorderColor: { default: string; focused: string };
	value?: T;
};

const useUpdateInputColors = <T,>({ borderColor, inputBorderColor, value }: Props<T>) => {
	useEffect(() => {
		borderColor.value = withTiming(value ? inputBorderColor.focused : inputBorderColor.default);
	}, [value, borderColor, inputBorderColor]);
};

export default useUpdateInputColors;
