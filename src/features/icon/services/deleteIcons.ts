import { db } from "@/src/db/db";
import { IconTable } from "@/src/db/schemas/Icon";

export default async function deleteIcons(): Promise<void> {
	await db.delete(IconTable);
}
