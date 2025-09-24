import Section from "@/src/components/ui/Section/Section";
import { useAccountsBalanceChartData } from "@/src/features/chart/contexts/AccountsBalanceChartContext";
import React from "react";
import { Pressable } from "react-native";

const AccountsBalanceChartHeader = () => {
	// #region Hooks
	const { showOptionsModal } = useAccountsBalanceChartData();
	//#endregion

	// #region Functions
	function handleOptionsPress() {
		showOptionsModal();
	}
	//#endregion

	return (
		<Section.Header>
			<Section.Title>Accounts balance</Section.Title>
			<Pressable onPress={handleOptionsPress}>
				<Section.Header.Link>Options</Section.Header.Link>
			</Pressable>
		</Section.Header>
	);
};

export default AccountsBalanceChartHeader;
