import BottomModal, { BottomModalProps } from "@/src/components/layout/BottomModal/BottomModal";
import BottomModalListItem from "@/src/components/layout/BottomModal/BottomModalListItem";
import BottomModalTitle from "@/src/components/layout/BottomModal/BottomModalTitle";
import ThemedText from "@/src/components/ui/ThemedText";
import useThemeColor from "@/src/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { forwardRef } from "react";
import { useAccount } from "../../contexts/AccountContext";

type Props = BottomModalProps;

const AccountMainModal = forwardRef<BottomSheetModal, Props>(({ modalRef, ...rest }, ref) => {
	// #region Hooks
	const { account } = useAccount();

	const defaultIconColor = useThemeColor({ variant: "neutral", shade: 800 });
	const deleteIconColor = useThemeColor({ variant: "danger", shade: 500 });
	//#endregion

	// #region Functions
	function handleEditPress() {
		modalRef?.current?.close();
	}
	//#endregion

	return (
		<BottomModal {...rest} ref={ref}>
			<BottomModalTitle>Account options</BottomModalTitle>

			<Link href={`/accounts/${account?.id}/edit`} onPress={handleEditPress} asChild>
				<BottomModalListItem>
					<Ionicons name="pencil" size={24} color={defaultIconColor} />
					<ThemedText>Edit account</ThemedText>
				</BottomModalListItem>
			</Link>
			<BottomModalListItem disabled={account?.default}>
				<Ionicons name="trash" size={24} color={deleteIconColor} />
				<ThemedText variant="danger" shade={500}>
					Delete account
				</ThemedText>
			</BottomModalListItem>
		</BottomModal>
	);
});

// Display name
AccountMainModal.displayName = "AccountMainModal";

export default AccountMainModal;
