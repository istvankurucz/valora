import AppName from "@/src/components/ui/AppName";
import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

const AdminWelcome = () => {
	// #region States
	const [now, setNow] = useState(new Date());
	//#endregion

	// #region Refs
	const intervalRef = useRef<number>(undefined);
	//#endregion

	//#region Hooks
	useEffect(() => {
		// Calculate ms until next minute
		const now = new Date();
		const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

		// Set timeout to update at the start of the next minute
		const timeout = setTimeout(() => {
			setNow(new Date());
			intervalRef.current = setInterval(() => setNow(new Date()), 60 * 1000);
		}, msToNextMinute);

		return () => {
			clearTimeout(timeout);
			clearInterval(intervalRef.current);
		};
	}, []);
	//#endregion

	return (
		<View style={styles.container}>
			<AppName />

			<View style={styles.date}>
				<ThemedText shade={600} fontFamily="Poppins_500Medium" style={styles.day}>
					{format(now, "EEEE")}, {format(now, "HH:mm")}
				</ThemedText>
				<ThemedText fontFamily="Poppins_500Medium">{format(now, "MMMM d, yyyy")}</ThemedText>
			</View>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 32,
		justifyContent: "space-between",
	},

	date: {
		alignItems: "flex-end",
	},
	day: {
		fontSize: FONT_SIZE[400],
	},
});

export default AdminWelcome;
