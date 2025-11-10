import { useError } from "@/src/features/error/contexts/ErrorContext";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
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
	const { setError } = useError();

	useEffect(() => {
		(async () => {
			try {
				await registerForPushNotificationsAsync();
				await scheduleDailyNotification();
			} catch (err) {
				setError(err);
			}
		})();
	}, [setError]);
	//#endregion

	return null;
};

export default NotificationsController;
