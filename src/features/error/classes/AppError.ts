import { AppError as AppErrorType } from "../types/errorTypes";

class AppError extends Error {
	details?: string;

	constructor(error: AppErrorType) {
		const { message, details } = error;

		super(message);
		this.details = details;

		// Fixing prototype chain
		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}
}

export default AppError;
