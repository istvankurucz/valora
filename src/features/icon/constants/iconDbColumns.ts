import { IconTable } from "@/src/db/schemas/Icon";

export const ICON_COLUMNS = {
	id: IconTable.id,
	name: IconTable.name,
	foregroundColor: IconTable.foregroundColor,
	backgroundColor: IconTable.backgroundColor,
} as const;
