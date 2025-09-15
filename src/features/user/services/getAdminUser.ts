import { db } from "@/src/db/db";
import AppError from "../../error/classes/AppError";
import { UserSelect } from "../types/userTypes";

export default async function getAdminUser(): Promise<UserSelect> {
	// Get admin
	const admin = await db.query.UserTable.findFirst({
		where: (user, { eq }) => eq(user.admin, true),
	});

	// Check admin
	if (!admin) throw new AppError({ message: "Admin not found." });

	// Return admin
	return admin;
}
