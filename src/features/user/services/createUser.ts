import { db } from "@/src/db/db";
import { UserTable } from "@/src/db/schemas/User";
import AppError from "../../error/classes/AppError";
import { UserInsert, UserSelect } from "../types/userTypes";

export default async function createUser(data: Omit<UserInsert, "admin">): Promise<UserSelect> {
	// Create user
	const [user] = await db
		.insert(UserTable)
		.values({ ...data, admin: false })
		.returning();

	// Check user
	if (!user) throw new AppError({ message: "Error creating user." });

	// Return user
	return user;
}
