import { db } from "@/src/db/db";
import AppError from "../../error/classes/AppError";
import { UserData } from "../types/userTypes";

export default async function getUser(id: string): Promise<UserData> {
	// Get user
	const user = await db.query.UserTable.findFirst({
		columns: {
			updatedAt: false,
			createdAt: false,
		},
		where: (user, { eq }) => eq(user.id, id),
	});

	// Check user
	if (!user) throw new AppError({ message: "User not found." });

	// Return user
	return user;
}
