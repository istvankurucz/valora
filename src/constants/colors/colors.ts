//#region Success palette
const SUCCESS_100 = "#e6f7ef";
const SUCCESS_200 = "#b3ebd1";
const SUCCESS_300 = "#80dfb3";
const SUCCESS_400 = "#4dd394";
const SUCCESS_500 = "#00a650";
const SUCCESS_600 = "#008c44";
const SUCCESS_700 = "#006f36";
const SUCCESS_800 = "#005229";
const SUCCESS_900 = "#00351b";
const success = {
	100: SUCCESS_100,
	200: SUCCESS_200,
	300: SUCCESS_300,
	400: SUCCESS_400,
	500: SUCCESS_500,
	600: SUCCESS_600,
	700: SUCCESS_700,
	800: SUCCESS_800,
	900: SUCCESS_900,
};
//#endregion

//#region Danger palette
const DANGER_100 = "#fde8e8";
const DANGER_200 = "#fbbbbb";
const DANGER_300 = "#f78a8a";
const DANGER_400 = "#f35858";
const DANGER_500 = "#eb001b";
const DANGER_600 = "#c70016";
const DANGER_700 = "#a10012";
const DANGER_800 = "#6d000c";
const DANGER_900 = "#3a0006";
const danger = {
	100: DANGER_100,
	200: DANGER_200,
	300: DANGER_300,
	400: DANGER_400,
	500: DANGER_500,
	600: DANGER_600,
	700: DANGER_700,
	800: DANGER_800,
	900: DANGER_900,
};
//#endregion

//#region Warning palette
const WARNING_100 = "#fff6e6";
const WARNING_200 = "#ffe0b3";
const WARNING_300 = "#ffcb80";
const WARNING_400 = "#ffb74d";
const WARNING_500 = "#f79e1b";
const WARNING_600 = "#cc7f15";
const WARNING_700 = "#a36210";
const WARNING_800 = "#793f0a";
const WARNING_900 = "#4d2405";
const warning = {
	100: WARNING_100,
	200: WARNING_200,
	300: WARNING_300,
	400: WARNING_400,
	500: WARNING_500,
	600: WARNING_600,
	700: WARNING_700,
	800: WARNING_800,
	900: WARNING_900,
};
//#endregion

//#region Info palette
const INFO_100 = "#e6f2f7";
const INFO_200 = "#b3d9e6";
const INFO_300 = "#80bfda";
const INFO_400 = "#4da6cd";
const INFO_500 = "#3C8CB1";
const INFO_600 = "#327293";
const INFO_700 = "#285974";
const INFO_800 = "#1e4055";
const INFO_900 = "#142836";
const info = {
	100: INFO_100,
	200: INFO_200,
	300: INFO_300,
	400: INFO_400,
	500: INFO_500,
	600: INFO_600,
	700: INFO_700,
	800: INFO_800,
	900: INFO_900,
};
// #endregion

export const COLORS = {
	light: {
		neutral: {
			100: "#ffffff",
			200: "#f6f6f6",
			300: "#ededed",
			400: "#d1d1d1", //
			500: "#969696",
			600: "#5f6c72", //
			700: "#374047", //
			800: "#1d2a30",
			900: "#000000",
		},
		success,
		danger,
		warning,
		info,
	},
	dark: {
		neutral: {
			100: "#000000",
			200: "#121517",
			300: "#1d2a30",
			400: "#374047",
			500: "#969696",
			600: "#d1d1d1",
			700: "#ededed",
			800: "#f4f4f4",
			900: "#ffffff",
		},
		success,
		danger,
		warning,
		info,
	},
} as const;
export type ColorVariant = keyof (typeof COLORS)["light" | "dark"];
export type ColorShade = keyof (typeof COLORS)["light" | "dark"][
	| "neutral"
	| "success"
	| "danger"
	| "warning"
	| "info"];
