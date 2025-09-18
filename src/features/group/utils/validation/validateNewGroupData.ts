import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import { NewGroupFormData } from "../../constants/formData";
import { NewGroupData, newGroupSchema } from "../../constants/validation/newGroupSchema";

export default function validateNewGroupData(groupData: NewGroupFormData): NewGroupData {
	// Validation
	const { success, error, data } = newGroupSchema.safeParse(groupData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
