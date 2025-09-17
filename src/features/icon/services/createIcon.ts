import { db } from "@/src/db/db";
import { IconTable } from "@/src/db/schemas/Icon";
import AppError from "../../error/classes/AppError";
import { IconInsert, IconSelect } from "../types/iconTypes";

export default async function createIcon(data: IconInsert): Promise<IconSelect> {
	// Create icon
	const [icon] = await db.insert(IconTable).values(data).returning();

	// Check icon
	if (!icon) throw new AppError({ message: "Error creating icon." });

	// Return icon
	return icon;
}
