import { StorageAccessFramework } from "expo-file-system/legacy";

export default async function createExportFile(directoryUri: string): Promise<string> {
	const uri = await StorageAccessFramework.createFileAsync(
		directoryUri,
		`valora_export_${new Date().toISOString()}.json`,
		"application/json"
	);
	return uri;
}
