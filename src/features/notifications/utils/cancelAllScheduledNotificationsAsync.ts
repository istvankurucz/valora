import * as Notifications from "expo-notifications";

export default async function cancelAllScheduledNotificationsAsync(): Promise<void> {
	await Notifications.cancelAllScheduledNotificationsAsync();
}
