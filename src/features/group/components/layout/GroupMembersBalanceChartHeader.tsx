import Section from "@/src/components/ui/Section/Section";
import { useGroupMembersBalanceChartData } from "@/src/features/chart/contexts/GroupMembersBalanceChartContext";
import { Pressable } from "react-native";

const GroupMembersBalanceChartHeader = () => {
	// #region Hooks
	const { showOptionsModal } = useGroupMembersBalanceChartData();
	//#endregion

	// #region Functions
	function handleOptionsPress() {
		showOptionsModal();
	}
	//#endregion

	return (
		<Section.Header>
			<Section.Title>Members balance</Section.Title>
			<Pressable onPress={handleOptionsPress}>
				<Section.Header.Link>Options</Section.Header.Link>
			</Pressable>
		</Section.Header>
	);
};

export default GroupMembersBalanceChartHeader;
