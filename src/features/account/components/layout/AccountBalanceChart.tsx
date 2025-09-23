import Section from "@/src/components/ui/Section/Section";
import { View } from "react-native";
import BalanceChart from "../../chart/components/ui/BalanceChart";
import { BalanceChartProvider } from "../../chart/contexts/BalanceChartContext";
import { ChartProvider } from "../../chart/contexts/ChartContext";
import { ChartNavigationProvider } from "../../chart/contexts/ChartNavigationContext";
import { useAccount } from "../../contexts/AccountContext";

const AccountBalanceChart = () => {
	//#region Hooks
	const { account } = useAccount();
	// #endregion

	return (
		<View>
			<Section.Title>Account balance</Section.Title>

			<ChartProvider transactions={account?.transactions ?? []}>
				<ChartNavigationProvider>
					<BalanceChartProvider>
						<BalanceChart />
					</BalanceChartProvider>
				</ChartNavigationProvider>
			</ChartProvider>
		</View>
	);
};

export default AccountBalanceChart;
