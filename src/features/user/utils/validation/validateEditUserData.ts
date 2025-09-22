import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import { EditUserFormData } from "../../constants/formData";
import { EditUserData, editUserSchema } from "../../constants/validation/editUserSchema";

export default function validateEditUserData(userData: EditUserFormData): EditUserData {
	// Validation
	const { success, error, data } = editUserSchema.safeParse(userData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
