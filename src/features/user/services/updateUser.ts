import { db } from "@/src/db/db";
import { UserTable } from "@/src/db/schemas/User";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { UserSelect, UserUpdate } from "../types/userTypes";

export default async function updateUser(id: string, data: UserUpdate): Promise<UserSelect> {
	// Update user
	const [user] = await db.update(UserTable).set(data).where(eq(UserTable.id, id)).returning();

	// Check user
	if (!user) throw new AppError({ message: "Error updating user." });

	// Return user
	return user;
}
