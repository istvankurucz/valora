import { db } from "@/src/db/db";
import { AdminPreferencesTable } from "@/src/db/schemas/AdminPreferences";

export default async function deleteAdminPreferences(): Promise<void> {
	await db.delete(AdminPreferencesTable);
}
