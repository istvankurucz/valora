import { db } from "@/src/db/db";
import { IconSelect } from "../types/iconTypes";

export default async function getRawIcons(): Promise<IconSelect[]> {
	const icons = await db.query.IconTable.findMany();
	return icons;
}
