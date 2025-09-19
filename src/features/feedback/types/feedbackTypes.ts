// #region Feedback
export type FeedbackType = "success" | "error" | "info";
export type Feedback = {
	type: FeedbackType;
	message: string;
	details?: string;
};
//#endregion
