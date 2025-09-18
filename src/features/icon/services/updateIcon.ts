import { db } from "@/src/db/db";
import { IconTable } from "@/src/db/schemas/Icon";
import { eq } from "drizzle-orm";
import AppError from "../../error/classes/AppError";
import { IconSelect, IconUpdate } from "../types/iconTypes";

export default async function updateIcon(id: string, data: IconUpdate): Promise<IconSelect> {
	// Update icon
	const [icon] = await db.update(IconTable).set(data).where(eq(IconTable.id, id)).returning();

	// Check icon
	if (!icon) throw new AppError({ message: "Error updating icon." });

	// Return icon
	return icon;
}
