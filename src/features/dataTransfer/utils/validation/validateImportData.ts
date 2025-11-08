import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import { dataTransferSchema } from "../../constants/validation/dataTransferSchema";
import { DataTransfer } from "../../types/dataTransferTypes";

export default function validateImportData(importData: unknown): DataTransfer {
	// Validation
	const { success, error, data } = dataTransferSchema.safeParse(importData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
