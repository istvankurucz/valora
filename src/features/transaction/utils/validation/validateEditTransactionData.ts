import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import {
	EditTransactionData,
	editTransactionSchema,
} from "../../constants/validation/editTransactionSchema";

export default function validateEditTransactionData(
	transactionData: EditTransactionData
): EditTransactionData {
	// Validation
	const { success, error, data } = editTransactionSchema.safeParse(transactionData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
