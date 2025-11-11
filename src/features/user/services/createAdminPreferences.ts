import { db } from "@/src/db/db";
import { AdminPreferencesTable } from "@/src/db/schemas/AdminPreferences";
import AppError from "../../error/classes/AppError";
import { AdminPreferencesInsert, AdminPreferencesSelect } from "../types/userTypes";

export default async function createAdminPreferences(
	data: AdminPreferencesInsert
): Promise<AdminPreferencesSelect> {
	// Create preferences
	const [preferences] = await db.insert(AdminPreferencesTable).values(data).returning();

	// Check if preferences was created
	if (!preferences) throw new AppError({ message: "Error creating admin preferences." });

	// Return preferences
	return preferences;
}
