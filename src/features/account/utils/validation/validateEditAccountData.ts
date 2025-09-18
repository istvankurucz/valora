import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import { EditAccountFormData } from "../../constants/formData";
import { EditAccountData, editAccountSchema } from "../../constants/validation/editAccountSchema";

export default function validateEditAccountData(accountData: EditAccountFormData): EditAccountData {
	// Validation
	const { success, error, data } = editAccountSchema.safeParse(accountData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
