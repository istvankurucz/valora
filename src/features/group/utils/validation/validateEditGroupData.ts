import ValidationError from "@/src/features/error/classes/ValidationError";
import getZodValidationErrors from "@/src/features/error/utils/getZodValidationErrors";
import { EditGroupFormData } from "../../constants/formData";
import { EditGroupData, editGroupSchema } from "../../constants/validation/editGroupSchema";

export default function validateEditGroupData(groupData: EditGroupFormData): EditGroupData {
	// Validation
	const { success, error, data } = editGroupSchema.safeParse(groupData);

	// Check error
	if (!success) throw new ValidationError(getZodValidationErrors(error));

	// Return data
	return data;
}
