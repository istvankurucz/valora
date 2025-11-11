import { db } from "@/src/db/db";
import AppError from "../../error/classes/AppError";
import { AdminPreferencesSelect } from "../types/userTypes";

export default async function getRawAdminPreferences(): Promise<AdminPreferencesSelect> {
	// Get preferences
	const preferences = await db.query.AdminPreferencesTable.findFirst();

	// Check preferences
	if (!preferences) throw new AppError({ message: "Admin preferences not found." });

	// Return preferences
	return preferences;
}
