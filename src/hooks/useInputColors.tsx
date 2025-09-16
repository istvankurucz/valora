import { ColorVariant } from "../constants/colors/colors";
import useThemeColor from "./useThemeColor";

type Props = {
	variant: ColorVariant;
};

const useInputColors = ({ variant }: Props) => {
	//#region Hooks
	const neutralDefaultBorderColor = useThemeColor({ variant: "neutral", shade: 500 });
	const neutralFocusedBorderColor = useThemeColor({ variant: "neutral", shade: 700 });

	const successDefaultBorderColor = useThemeColor({ variant: "success", shade: 500 });
	const successFocusedBorderColor = useThemeColor({ variant: "success", shade: 700 });

	const dangerDefaultBorderColor = useThemeColor({ variant: "danger", shade: 500 });
	const dangerFocusedBorderColor = useThemeColor({ variant: "danger", shade: 700 });

	const warningDefaultBorderColor = useThemeColor({ variant: "warning", shade: 500 });
	const warningFocusedBorderColor = useThemeColor({ variant: "warning", shade: 700 });

	const infoDefaultBorderColor = useThemeColor({ variant: "info", shade: 500 });
	const infoFocusedBorderColor = useThemeColor({ variant: "info", shade: 700 });
	//#endregion

	switch (variant) {
		case "neutral":
			return {
				borderColor: {
					default: neutralDefaultBorderColor,
					focused: neutralFocusedBorderColor,
				},
			};
		case "success":
			return {
				borderColor: {
					default: successDefaultBorderColor,
					focused: successFocusedBorderColor,
				},
			};
		case "danger":
			return {
				borderColor: {
					default: dangerDefaultBorderColor,
					focused: dangerFocusedBorderColor,
				},
			};
		case "warning":
			return {
				borderColor: {
					default: warningDefaultBorderColor,
					focused: warningFocusedBorderColor,
				},
			};
		case "info":
			return {
				borderColor: {
					default: infoDefaultBorderColor,
					focused: infoFocusedBorderColor,
				},
			};
	}
};

export default useInputColors;
