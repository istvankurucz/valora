import Section from "@/src/components/ui/Section/Section";
import { useChartModal } from "@/src/features/chart/contexts/ChartModalContext";
import { Pressable } from "react-native";

const AccountsBalanceChartHeader = () => {
	// #region Hooks
	const { showModal } = useChartModal();
	//#endregion

	return (
		<Section.Header>
			<Section.Title>Accounts balance</Section.Title>

			<Pressable onPress={showModal}>
				<Section.Header.Link>Options</Section.Header.Link>
			</Pressable>
		</Section.Header>
	);
};

export default AccountsBalanceChartHeader;
