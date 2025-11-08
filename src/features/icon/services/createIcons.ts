import { db } from "@/src/db/db";
import { IconTable } from "@/src/db/schemas/Icon";
import { IconInsert, IconSelect } from "../types/iconTypes";

export default async function createIcons(data: IconInsert[]): Promise<IconSelect[]> {
	const icons = await db.insert(IconTable).values(data).returning();
	return icons;
}
