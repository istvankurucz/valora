import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { ICONS } from "@/src/features/icon/constants/icons";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fragment, useEffect, useRef, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import IconBox from "../../ui/IconBox";
import ThemedText from "../../ui/ThemedText";
import ThemedView from "../../ui/ThemedView";
import Underlay from "../../ui/Underlay/Underlay";
import Input from "../Input/Input";

export type IconInputProps = {
	value?: string;
	onIconChange?: (name: string) => void;
	iconColor?: string;
	backgroundColor?: string;
};

const IconInput = ({ value, onIconChange, iconColor, backgroundColor }: IconInputProps) => {
	//#region States
	const [showOptions, setShowOptions] = useState(false);
	const [filteredIcons, setFilteredIcons] = useState<string[]>([]);
	const [searchText, setSearchText] = useState("");
	//#endregion

	// #region Refs
	const timeoutRef = useRef<number>(undefined);
	//#endregion

	// #region Hooks
	const defaultIconColor = useThemeColor({ variant: "neutral", shade: 800 });
	const selectedIconBackgroundColor = useThemeColor({ variant: "neutral", shade: 400 });
	const defaultBackgroundColor = useThemeColor({ variant: "neutral", shade: 200 });

	useEffect(() => {
		// Clear previous timeout
		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			const filteredIcons = ICONS.filter((icon) =>
				icon.toLowerCase().includes(searchText.toLowerCase())
			);
			setFilteredIcons(filteredIcons);
		}, 500);
	}, [searchText]);
	//#endregion

	// #region Functions
	function handleOpenPress() {
		setShowOptions(true);
	}

	function handleOptionPress(iconName: string) {
		// Run event handler
		onIconChange?.(iconName);

		// Reset search text
		setSearchText("");

		// Hide modal
		setShowOptions(false);
	}

	function handleRequestClose() {
		setShowOptions(false);
	}
	//#endregion

	return (
		<Fragment>
			<Pressable onPress={handleOpenPress}>
				{value && (
					<IconBox
						icon={{
							name: value,
							foregroundColor: iconColor ?? defaultIconColor,
							backgroundColor: backgroundColor ?? defaultBackgroundColor,
							size: 24,
						}}
						style={styles.iconBox}
					/>
				)}
				{!value && <ThemedText>No icon selected.</ThemedText>}
			</Pressable>

			<Modal
				visible={showOptions}
				backdropColor="transparent"
				onRequestClose={handleRequestClose}
			>
				<ThemedView style={styles.modal}>
					<FlatList
						data={filteredIcons}
						keyExtractor={(icon) => icon}
						renderItem={({ item }) => (
							<Underlay
								style={[
									styles.option,
									item === value
										? { backgroundColor: selectedIconBackgroundColor }
										: undefined,
								]}
								onPress={() => handleOptionPress(item)}
							>
								<Ionicons name={item as any} size={32} color={iconColor} />
							</Underlay>
						)}
						numColumns={5}
						keyboardShouldPersistTaps="handled"
						ListHeaderComponent={
							<View style={styles.modalHeader}>
								<Input
									search
									placeholder="Search icon"
									value={searchText}
									onChangeText={(searchText) => setSearchText(searchText)}
								/>
							</View>
						}
						ListEmptyComponent={
							<ThemedText style={styles.noResult}>No icon found.</ThemedText>
						}
						columnWrapperStyle={styles.list}
					/>
				</ThemedView>
			</Modal>
		</Fragment>
	);
};

// Styles
const styles = StyleSheet.create({
	iconBox: {
		padding: 12,
	},
	modal: {
		flex: 1,
		alignItems: "stretch",
		borderRadius: BORDER_RADIUS[500],
		padding: 16,
		marginHorizontal: 24,
		marginVertical: 48,
		overflow: "hidden",
	},
	modalHeader: {
		flex: 1,
		marginBottom: 32,
	},
	list: {
		alignSelf: "center",
	},
	noResult: {
		textAlign: "center",
	},
	option: {
		width: 56,
		height: 56,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: BORDER_RADIUS[400],
	},
});

export default IconInput;
