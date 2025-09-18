import useThemeColor from "@/src/hooks/useThemeColor";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProps,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import { forwardRef, RefObject } from "react";
import { StyleSheet } from "react-native";

export type BottomModalProps = Omit<BottomSheetModalProps, "children"> & {
	modalRef?: RefObject<BottomSheetModal | null>;
	children?: BottomSheetViewProps["children"];
};

const BottomModal = forwardRef<BottomSheetModal, BottomModalProps>(
	({ snapPoints, backdropComponent, style, handleIndicatorStyle, children, ...rest }, ref) => {
		// #region Hooks
		const backgroundColor = useThemeColor({ variant: "neutral", shade: 200 });
		const handleColor = useThemeColor({ variant: "neutral", shade: 500 });
		//#endregion

		return (
			<BottomSheetModal
				snapPoints={snapPoints ?? [250]}
				backdropComponent={(props) => (
					<BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
				)}
				backgroundStyle={{ backgroundColor }}
				handleIndicatorStyle={[
					styles.handle,
					{ backgroundColor: handleColor },
					handleIndicatorStyle,
				]}
				{...rest}
				ref={ref}
			>
				<BottomSheetView style={[styles.container, style]}>{children}</BottomSheetView>
			</BottomSheetModal>
		);
	}
);

// Display name
BottomModal.displayName = "BottomModal";

// Styles
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingBottom: 48,
	},
	handle: {
		width: 100,
		marginTop: 8,
		marginBottom: 32,
	},
});

export default BottomModal;
