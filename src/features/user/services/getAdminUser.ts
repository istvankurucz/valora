import { db } from "@/src/db/db";
import AppError from "../../error/classes/AppError";
import { AdminUser } from "../types/userTypes";

export default async function getAdminUser(): Promise<AdminUser> {
	// Get admin
	const admin = await db.query.UserTable.findFirst({
		where: (user, { eq }) => eq(user.admin, true),
	});

	// Check admin
	if (!admin || !admin.currency) throw new AppError({ message: "Admin not found." });

	// Return admin
	return admin as AdminUser;
}
