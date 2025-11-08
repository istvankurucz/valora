import { DataTransferMetadata } from "../types/dataTransferTypes";

export default function getExportMetadata(): DataTransferMetadata {
	return {
		exportedAt: new Date().toISOString(),
	};
}
