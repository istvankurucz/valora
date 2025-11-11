import * as Notifications from "expo-notifications";
import cancelAllScheduledNotificationsAsync from "./cancelAllScheduledNotificationsAsync";

export default async function scheduleDailyNotification() {
	await cancelAllScheduledNotificationsAsync();

	await Notifications.scheduleNotificationAsync({
		content: {
			title: "Daily Reminder ⏰",
			body: "Time to check your daily expenses!",
		},
		trigger: {
			type: Notifications.SchedulableTriggerInputTypes.DAILY,
			hour: 20,
			minute: 0,
		},
	});
}
