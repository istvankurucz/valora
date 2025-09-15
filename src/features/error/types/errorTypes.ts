//#region Form validation
export type ValidationError = {
	field: string;
	message: string;
};
//#endregion

//#region App error
export type AppError = {
	message: string;
	details?: string;
};
//#endregion
