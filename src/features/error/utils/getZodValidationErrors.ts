import { ZodError } from "zod/v4";
import { ValidationError } from "../types/errorTypes";

export default function getZodValidationErrors(error: ZodError): ValidationError[] {
	return error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message }));
}
