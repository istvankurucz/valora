import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import { NewTransactionCategoryFormData } from "../../constants/formData";
import {
	NewTransactionCategoryData,
	newTransactionCategorySchema,
} from "../../constants/validation/newTransactionCategorySchema";

export default function validateNewTransactionCategoryData(
	categoryData: NewTransactionCategoryFormData
): NewTransactionCategoryData {
	// Validation
	const { success, error, data } = newTransactionCategorySchema.safeParse(categoryData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
