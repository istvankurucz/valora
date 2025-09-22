import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalListItem from "@/src/components/layout/BottomModal/BottomModalListItem";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import ThemedText from "@/src/components/ui/ThemedText";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { forwardRef, RefObject } from "react";
import { StyleSheet, View } from "react-native";
import { useAccount } from "../../contexts/AccountContext";

type Props = BottomModalProps & {
	deleteModalRef: RefObject<BottomSheetModal | null>;
};

const AccountMainModal = forwardRef<BottomSheetModal, Props>(
	({ modalRef, deleteModalRef, snapPoints, ...rest }, ref) => {
		// #region Hooks
		const { account } = useAccount();

		const defaultIconColor = useThemeColor({ variant: "neutral", shade: 800 });
		const deleteIconColor = useThemeColor({ variant: "danger", shade: 500 });
		//#endregion

		// #region Functions
		function handleEditPress() {
			modalRef?.current?.close();
		}

		function handleDeletePress() {
			deleteModalRef.current?.present();
		}
		//#endregion

		return (
			<BottomModal snapPoints={[300]} {...rest} ref={ref}>
				<BottomModalTitle>Account options</BottomModalTitle>

				<Link href={`/accounts/${account?.id}/transactions`} onPress={handleEditPress} asChild>
					<BottomModalListItem>
						<Ionicons name="card-outline" size={24} color={defaultIconColor} />
						<ThemedText>Transactions</ThemedText>
					</BottomModalListItem>
				</Link>
				<Link href={`/accounts/${account?.id}/edit`} onPress={handleEditPress} asChild>
					<BottomModalListItem>
						<Ionicons name="pencil" size={24} color={defaultIconColor} />
						<ThemedText>Edit account</ThemedText>
					</BottomModalListItem>
				</Link>
				<BottomModalListItem disabled={account?.default} onPress={handleDeletePress}>
					<Ionicons name="trash" size={24} color={deleteIconColor} />
					<View>
						<ThemedText variant="danger" shade={500}>
							Delete account
						</ThemedText>
						{account?.default && (
							<ThemedText variant="danger" shade={500} style={styles.deleteInfo}>
								(Default account cannot be deleted.)
							</ThemedText>
						)}
					</View>
				</BottomModalListItem>
			</BottomModal>
		);
	}
);

// Display name
AccountMainModal.displayName = "AccountMainModal";

// Styles
const styles = StyleSheet.create({
	deleteInfo: {
		fontSize: FONT_SIZE[400],
	},
});

export default AccountMainModal;
