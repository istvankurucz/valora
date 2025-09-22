import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import { NewUserFormData } from "../../constants/formData";
import { NewUserData, newUserSchema } from "../../constants/validation/newUserSchema";

export default function validateNewUserData(userData: NewUserFormData): NewUserData {
	// Validation
	const { success, error, data } = newUserSchema.safeParse(userData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
