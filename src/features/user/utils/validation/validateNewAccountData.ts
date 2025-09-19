import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import { NewAccountFormData } from "../../constants/formData";
import { NewAccountData, newAccountSchema } from "../../constants/validation/newAccountSchema";

export default function validateNewAccountData(accountData: NewAccountFormData): NewAccountData {
	// Validation
	const { success, error, data } = newAccountSchema.safeParse(accountData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
