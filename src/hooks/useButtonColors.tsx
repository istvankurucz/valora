import { ColorVariant } from "../constants/colors/colors";
import useThemeColor from "./useThemeColor";

type Props = {
	variant: ColorVariant;
};

const useButtonColors = ({ variant }: Props) => {
	// #region Hooks
	const defaultTitleColor = useThemeColor({ variant: "neutral", shade: 100 });

	const neutralDefaultBackgroundColor = useThemeColor({ variant: "neutral", shade: 800 });
	const neutralActiveBackgroundColor = useThemeColor({ variant: "neutral", shade: 900 });

	const successDefaultBackgroundColor = useThemeColor({ variant: "success", shade: 500 });
	const successActiveBackgroundColor = useThemeColor({ variant: "success", shade: 700 });

	const dangerDefaultBackgroundColor = useThemeColor({ variant: "danger", shade: 500 });
	const dangerActiveBackgroundColor = useThemeColor({ variant: "danger", shade: 700 });

	const warningDefaultBackgroundColor = useThemeColor({ variant: "warning", shade: 500 });
	const warningActiveBackgroundColor = useThemeColor({ variant: "warning", shade: 700 });

	const infoDefaultBackgroundColor = useThemeColor({ variant: "info", shade: 500 });
	const infoActiveBackgroundColor = useThemeColor({ variant: "info", shade: 700 });
	//#endregion

	switch (variant) {
		case "neutral":
			return {
				titleColor: {
					default: defaultTitleColor,
				},
				backgroundColor: {
					default: neutralDefaultBackgroundColor,
					active: neutralActiveBackgroundColor,
				},
			};
		case "success":
			return {
				titleColor: {
					default: defaultTitleColor,
				},
				backgroundColor: {
					default: successDefaultBackgroundColor,
					active: successActiveBackgroundColor,
				},
			};
		case "danger":
			return {
				titleColor: {
					default: defaultTitleColor,
				},
				backgroundColor: {
					default: dangerDefaultBackgroundColor,
					active: dangerActiveBackgroundColor,
				},
			};
		case "warning":
			return {
				titleColor: {
					default: defaultTitleColor,
				},
				backgroundColor: {
					default: warningDefaultBackgroundColor,
					active: warningActiveBackgroundColor,
				},
			};
		case "info":
			return {
				titleColor: {
					default: defaultTitleColor,
				},
				backgroundColor: {
					default: infoDefaultBackgroundColor,
					active: infoActiveBackgroundColor,
				},
			};
	}
};

export default useButtonColors;
