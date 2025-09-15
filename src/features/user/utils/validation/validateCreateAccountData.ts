import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import {
	CreateAccountData,
	createAccountSchema,
} from "../../constants/validation/createAccountSchema";

export default function validateCreateAccountData(accountData: unknown): CreateAccountData {
	// Validation
	const { success, error, data } = createAccountSchema.safeParse(accountData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
