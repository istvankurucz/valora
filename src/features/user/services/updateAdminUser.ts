import { db } from "@/src/db/db";
import { UserTable } from "@/src/db/schemas/User";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { AdminUserUpdate, UserSelect } from "../types/userTypes";

export default async function updateAdminUser(data: AdminUserUpdate): Promise<UserSelect> {
	// Update admin user
	const [admin] = await db
		.update(UserTable)
		.set(data)
		.where(eq(UserTable.admin, true))
		.returning();

	// Check admin user
	if (!admin) throw new AppError({ message: "Error updating admin." });

	// Return admin
	return admin;
}
