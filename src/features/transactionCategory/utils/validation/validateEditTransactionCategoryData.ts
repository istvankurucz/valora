import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import { EditTransactionCategoryFormData } from "../../constants/formData";
import {
	EditTransactionCategoryData,
	editTransactionCategorySchema,
} from "../../constants/validation/editTransactionCategorySchema";

export default function validateEditTransactionCategoryData(
	categoryData: EditTransactionCategoryFormData
): EditTransactionCategoryData {
	// Validation
	const { success, error, data } = editTransactionCategorySchema.safeParse(categoryData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
