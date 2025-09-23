import ThemedText from "@/src/components/ui/ThemedText";
import IconUnderlay from "@/src/components/ui/Underlay/IconUnderlay";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { useChartNavigation } from "../../contexts/ChartNavigationContext";
import formatChartDate from "../../utils/formatChartDate";

type Props = ViewProps;

const ChartDate = ({ style, ...rest }: Props) => {
	// #region States
	const [showPicker, setShowPicker] = useState(false);
	//#endregion

	// #region Hooks
	const { interval, date, setDate, navigate } = useChartNavigation();

	const iconBackgroundColor = useThemeColor({ variant: "neutral", shade: 200 });
	const iconColor = useThemeColor({ variant: "neutral", shade: 800 });
	//#endregion

	// #region Constants
	const showNavButton = interval !== "all";
	//#endregion

	// #region Functions
	function handleNextPress() {
		navigate(1);
	}

	function handlePrevPress() {
		navigate(-1);
	}

	function showDateInput() {
		setShowPicker(true);
	}

	function handleDateInputChange(_: any, date?: Date) {
		// Set date
		if (date) setDate(date);

		// Hide picker
		setShowPicker(false);
	}
	//#endregion

	return (
		<View style={[styles.container, style]} {...rest}>
			{showNavButton && (
				<IconUnderlay
					style={{ backgroundColor: iconBackgroundColor }}
					onPress={handlePrevPress}
				>
					<Ionicons name="chevron-back" size={16} color={iconColor} />
				</IconUnderlay>
			)}

			<TouchableOpacity onPress={showDateInput} style={styles.dateContainer}>
				<ThemedText fontFamily="Poppins_500Medium" style={styles.date}>
					{formatChartDate(date, interval)}
				</ThemedText>
			</TouchableOpacity>

			{showNavButton && (
				<IconUnderlay
					style={{ backgroundColor: iconBackgroundColor }}
					onPress={handleNextPress}
				>
					<Ionicons name="chevron-forward" size={16} color={iconColor} />
				</IconUnderlay>
			)}

			{showPicker && (
				<DateTimePicker
					mode="date"
					value={date}
					onChange={handleDateInputChange}
					maximumDate={new Date()}
					{...rest}
				/>
			)}
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		height: 40,
		flexDirection: "row",
		gap: 24,
		alignItems: "center",
	},
	dateContainer: {
		flex: 1,
	},
	date: {
		textAlign: "center",
	},
});

export default ChartDate;
