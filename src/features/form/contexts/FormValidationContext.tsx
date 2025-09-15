import { createContext, PropsWithChildren, useContext, useState } from "react";
import ValidationError from "../../error/classes/ValidationError";
import { ValidationError as ValidationErrorType } from "../../error/types/errorTypes";

// Context
type FormValidationContextType = {
	errors: ValidationErrorType[];
	addError: (error: unknown) => void;
	getErrorByField: (field: string) => ValidationErrorType | undefined;
	removeErrors: () => void;
};
const FormValidationContext = createContext<FormValidationContextType>({
	errors: [],
	addError: () => {},
	getErrorByField: () => undefined,
	removeErrors: () => {},
});

// Provider
type Props = PropsWithChildren;

export const FormValidationProvider = ({ children }: Props) => {
	// #region States
	const [errors, setErrors] = useState<ValidationErrorType[]>([]);
	//#endregion

	// #region Functions
	function addError(error: unknown): void {
		// Check validation error
		if (!(error instanceof ValidationError)) return;

		// Update errors array
		setErrors((errors) => [...errors, ...error.errors]);
	}

	function getErrorByField(field: string): ValidationErrorType | undefined {
		return errors.find((error) => error.field === field);
	}

	function removeErrors(): void {
		setErrors([]);
	}
	//#endregion

	return (
		<FormValidationContext.Provider value={{ errors, addError, getErrorByField, removeErrors }}>
			{children}
		</FormValidationContext.Provider>
	);
};

// Hook
export const useFormValidation = () => useContext(FormValidationContext);
