import ThemedText from "@/src/components/ui/ThemedText";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useBarChart } from "../../contexts/BarChartContext";
import { ChartValue } from "../../types/chartTypes";
import ChartValueBox from "./ChartValueBox";

const ChartValues = () => {
	// #region States
	const [title, setTitle] = useState("All");
	const [values, setValues] = useState<ChartValue[]>([]);
	//#endregion

	// #region Hooks
	const { chartData, selectedIndex, defaultLabel, useTypeAsLabel } = useBarChart();

	useEffect(() => {
		if (selectedIndex !== null) {
			// Get selected group
			const selectedGroup = chartData.groups[selectedIndex];

			// Check selected group
			if (!selectedGroup) return;

			// Map bars to values
			const newValues = selectedGroup.bars.map((bar) => ({
				value: bar.value,
				type: bar.type,
				label: bar.label,
			}));
			setValues(newValues);

			// Set title
			setTitle(selectedGroup.label || defaultLabel || "All");
		} else {
			// Initialize total values
			const totalValues: ChartValue[] = [];

			// Calculate total values from all groups
			chartData.groups.forEach((group) => {
				group.bars.forEach((bar) => {
					const existingValue = totalValues.find((v) => v.type === bar.type);
					if (existingValue) existingValue.value += bar.value;
					else
						totalValues.push({
							label: bar.label,
							value: bar.value,
							type: bar.type,
						});
				});
			});

			// Set total values
			setValues(totalValues);

			// Set title
			setTitle(defaultLabel || "All");
		}
	}, [chartData, selectedIndex, defaultLabel]);
	//#endregion

	return (
		<View style={styles.container}>
			<ThemedText fontFamily="Poppins_500Medium" style={styles.title}>
				{capitalizeString(title)}
			</ThemedText>

			<ScrollView
				horizontal
				contentContainerStyle={styles.boxes}
				showsHorizontalScrollIndicator={false}
			>
				{values.map((value, i) => (
					<ChartValueBox
						key={i}
						type={value.type}
						label={
							useTypeAsLabel ? capitalizeString(value.type) : capitalizeString(value.label)
						}
						value={value.value}
						style={{ width: `${100 / values.length}%` }}
					/>
				))}
			</ScrollView>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	title: {
		textAlign: "center",
	},
	boxes: {
		minWidth: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ChartValues;
