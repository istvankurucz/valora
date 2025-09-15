import { type ValidationError as ValidationErrorType } from "../types/errorTypes";

export default class ValidationError extends Error {
	errors: ValidationErrorType[];

	constructor(errors: ValidationErrorType[]) {
		super(JSON.stringify(errors));
		this.name = this.constructor.name;
		this.errors = errors;

		// Fixing prototype chain
		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}
}
