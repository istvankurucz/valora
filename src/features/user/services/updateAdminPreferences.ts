import { db } from "@/src/db/db";
import { AdminPreferencesTable } from "@/src/db/schemas/AdminPreferences";
import AppError from "../../error/classes/AppError";
import { AdminPreferencesSelect, AdminPreferencesUpdate } from "../types/userTypes";

export default async function updateAdminPreferences(
	data: AdminPreferencesUpdate
): Promise<AdminPreferencesSelect> {
	// Update admin preferences
	const [preferences] = await db.update(AdminPreferencesTable).set(data).returning();

	// Cceck preferences
	if (!preferences) throw new AppError({ message: "Error updating admin preferences." });

	// Return preferences
	return preferences;
}
