import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import {
	NewTransactionData,
	newTransactionSchema,
} from "../../constants/validation/newTransactionSchema";

export default function validateNewTransactionData(
	transactionData: NewTransactionData
): NewTransactionData {
	// Validation
	const { success, error, data } = newTransactionSchema.safeParse(transactionData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
