import * as Notifications from "expo-notifications";
import AppError from "../../error/classes/AppError";

export default async function registerForPushNotificationsAsync(): Promise<void> {
	const { status: existingStatus } = await Notifications.getPermissionsAsync();
	let finalStatus = existingStatus;

	if (existingStatus !== "granted") {
		const { status } = await Notifications.requestPermissionsAsync();
		finalStatus = status;
	}

	if (finalStatus !== "granted")
		throw new AppError({ message: "Push notification permissions not granted" });
}
