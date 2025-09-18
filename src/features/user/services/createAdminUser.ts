import { db } from "@/src/db/db";
import { UserTable } from "@/src/db/schemas/User";
import AppError from "../../error/classes/AppError";
import { AdminUser, AdminUserInsert } from "../types/userTypes";

export default async function createAdminUser(data: AdminUserInsert): Promise<AdminUser> {
	// Create admin
	const [admin] = await db
		.insert(UserTable)
		.values({ ...data, admin: true })
		.returning();

	// Check admin
	if (!admin || !admin.currency) throw new AppError({ message: "Error creating account." });

	// Return admin
	return admin as AdminUser;
}
