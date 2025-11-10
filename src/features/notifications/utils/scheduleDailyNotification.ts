import * as Notifications from "expo-notifications";

export default async function scheduleDailyNotification() {
	await Notifications.cancelAllScheduledNotificationsAsync();

	await Notifications.scheduleNotificationAsync({
		content: {
			title: "Daily Reminder ⏰",
			body: "Time to check your daily expenses!",
		},
		trigger: {
			type: Notifications.SchedulableTriggerInputTypes.DAILY,
			hour: 19,
			minute: 0,
		},
	});
}
