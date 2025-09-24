import AccountsBalanceChart from "@/src/features/chart/components/ui/AccountsBalanceChart";
import { ChartProvider } from "@/src/features/chart/contexts/ChartContext";
import { ChartNavigationProvider } from "@/src/features/chart/contexts/ChartNavigationContext";
import { useMemo } from "react";
import { View } from "react-native";
import { AccountsBalanceChartProvider } from "../../../chart/contexts/AccountsBalanceChartContext";
import { useAccounts } from "../../contexts/AccountsContext";
import AccountsBalanceChartHeader from "./AccountsBalanceChartHeader";

const AccountsBalanceChartSection = () => {
	//#region Hooks
	const { accounts } = useAccounts();
	// #endregion

	// #region Constants
	const transactions = useMemo(
		() => accounts.map((account) => account.transactions).flat(),
		[accounts]
	);
	//#endregion

	return (
		<View>
			<ChartProvider transactions={transactions}>
				<ChartNavigationProvider>
					<AccountsBalanceChartProvider>
						<AccountsBalanceChartHeader />
						<AccountsBalanceChart />
					</AccountsBalanceChartProvider>
				</ChartNavigationProvider>
			</ChartProvider>
		</View>
	);
};

export default AccountsBalanceChartSection;
