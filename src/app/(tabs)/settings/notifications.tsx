import Screen from "@/src/components/layout/Screen/Screen";
import EditNotificationsForm from "@/src/features/notifications/components/form/EditNotificationsForm";

const Notifications = () => {
	return (
		<Screen>
			<Screen.ScrollView>
				<EditNotificationsForm />
			</Screen.ScrollView>
		</Screen>
	);
};

export default Notifications;
