import { useError } from "@/src/features/error/contexts/ErrorContext";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import cancelAllScheduledNotificationsAsync from "../../utils/cancelAllScheduledNotificationsAsync";
import registerForPushNotificationsAsync from "../../utils/registerForPushNotificationsAsync";
import scheduleDailyNotification from "../../utils/scheduleDailyNotification";

const NotificationsController = () => {
	//#region Handler
	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldPlaySound: false,
			shouldSetBadge: false,
			shouldShowBanner: true,
			shouldShowList: true,
		}),
	});
	//#endregion

	// #reigon Hooks
	const { admin } = useAdminUser();
	const { setError } = useError();

	useEffect(() => {
		(async () => {
			try {
				await registerForPushNotificationsAsync();

				if (admin?.preferences.notifications) {
					await scheduleDailyNotification();
				} else {
					await cancelAllScheduledNotificationsAsync();
				}
			} catch (err) {
				setError(err);
			}
		})();
	}, [admin, setError]);
	//#endregion

	return null;
};

export default NotificationsController;
