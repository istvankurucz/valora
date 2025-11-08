import getRawData from "../services/getRawData";
import { DataTransfer } from "../types/dataTransferTypes";
import getExportMetadata from "./getExportMetadata";

export default async function getExportData(): Promise<DataTransfer> {
	// Get data to export
	const data = await getRawData();

	// Get metadata to export
	const metadata = getExportMetadata();

	return { data, metadata };
}
