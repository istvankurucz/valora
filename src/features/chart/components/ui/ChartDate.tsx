import ThemedText from "@/src/components/ui/ThemedText";
import IconUnderlay from "@/src/components/ui/Underlay/IconUnderlay";
import { INITIAL_DATE } from "@/src/constants/initialDate";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import DatePicker from "react-native-date-picker";
import { useChartNavigation } from "../../contexts/ChartNavigationContext";
import formatChartDate from "../../utils/formatChartDate";

type Props = ViewProps;

const ChartDate = ({ style, ...rest }: Props) => {
	// #region States
	const [showPicker, setShowPicker] = useState(false);
	//#endregion

	// #region Hooks
	const { interval, date, setDate, navigate, disablePrevButton, disableNextButton } =
		useChartNavigation();

	const dateInputColor = useThemeColor({ variant: "neutral", shade: 800 });
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

	function handleDateInputChange(date: Date) {
		// Set date
		setDate(date);

		// Hide picker
		setShowPicker(false);
	}

	function handleCancelPress() {
		setShowPicker(false);
	}
	//#endregion

	return (
		<View style={[styles.container, style]} {...rest}>
			{showNavButton && (
				<IconUnderlay
					disabled={disablePrevButton}
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
					disabled={disableNextButton}
					style={{ backgroundColor: iconBackgroundColor }}
					onPress={handleNextPress}
				>
					<Ionicons name="chevron-forward" size={16} color={iconColor} />
				</IconUnderlay>
			)}

			<DatePicker
				modal
				open={showPicker}
				mode="date"
				date={date === INITIAL_DATE ? new Date() : date}
				maximumDate={new Date()}
				buttonColor={dateInputColor}
				dividerColor={dateInputColor}
				onConfirm={handleDateInputChange}
				onCancel={handleCancelPress}
				{...rest}
			/>
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
