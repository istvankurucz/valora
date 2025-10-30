import { ChartInterval } from "@/src/features/chart/constants/chartIntervalOptions";
import { useAccountsBalanceChart } from "@/src/features/chart/contexts/AccountsBalanceChartContext";
import { BarChartProvider } from "@/src/features/chart/contexts/BarChartContext";
import { BarChartData } from "@/src/features/chart/types/chartTypes";
import getAccountsBalanceChartData from "@/src/features/chart/utils/getAccountsBalanceChartData";
import getFirstTransactionDate from "@/src/features/transaction/utils/getFirstTransactionDate";
import { View } from "react-native";
import { useAccounts } from "../../contexts/AccountsContext";
import AccountsBalanceChartHeader from "./AccountsBalanceChartHeader";

const AccountsBalanceChartSection = () => {
	//#region Hooks
	const { accounts } = useAccounts();
	const { data } = useAccountsBalanceChart();
	// #endregion

	// #region Constants
	const firstTransactionDate = getFirstTransactionDate(
		accounts.map((account) => account.transactions).flat()
	);
	//#endregion

	// #region Functions
	function getChartData(params: { interval: ChartInterval; date: Date }): BarChartData {
		return getAccountsBalanceChartData(accounts, {
			...params,
			types: data.types,
		});
	}
	//#endregion

	return (
		<View>
			<AccountsBalanceChartHeader />
			<BarChartProvider
				getChartData={getChartData}
				firstTransactionDate={firstTransactionDate}
				defaultLabel="All accounts"
			/>
		</View>
	);
};

export default AccountsBalanceChartSection;
