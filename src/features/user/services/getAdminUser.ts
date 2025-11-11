import { db } from "@/src/db/db";
import { AdminPreferencesTable } from "@/src/db/schemas/AdminPreferences";
import { UserTable } from "@/src/db/schemas/User";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { AdminUser } from "../types/userTypes";

export default async function getAdminUser(): Promise<AdminUser> {
	// Get admin
	const [admin] = await db
		.select({
			id: UserTable.id,
			name: UserTable.name,
			admin: UserTable.admin,
			updatedAt: UserTable.updatedAt,
			createdAt: UserTable.createdAt,
			preferences: {
				currency: AdminPreferencesTable.currency,
				notifications: AdminPreferencesTable.notifications,
			},
		})
		.from(UserTable)
		.innerJoin(AdminPreferencesTable, eq(UserTable.id, AdminPreferencesTable.userId))
		.where(eq(UserTable.admin, true));

	// Check admin
	if (!admin) throw new AppError({ message: "Admin not found." });

	// Return admin
	return admin as AdminUser;
}
