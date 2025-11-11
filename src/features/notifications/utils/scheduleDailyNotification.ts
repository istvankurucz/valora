import * as Notifications from "expo-notifications";

export default async function scheduleDailyNotification() {
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
