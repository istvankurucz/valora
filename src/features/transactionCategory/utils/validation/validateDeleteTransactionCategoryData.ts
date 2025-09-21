import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import { DeleteTransactionCategoryFormData } from "../../constants/formData";
import {
	DeleteTransactionCategoryData,
	deleteTransactionCategorySchema,
} from "../../constants/validation/deleteTransactionCategorySchema";

export default function validateDeleteTransactionCategoryData(
	categoryData: DeleteTransactionCategoryFormData
): DeleteTransactionCategoryData {
	// Validation
	const { success, error, data } = deleteTransactionCategorySchema.safeParse(categoryData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
