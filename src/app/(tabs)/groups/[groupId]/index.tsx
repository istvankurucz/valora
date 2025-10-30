import Screen from "@/src/components/layout/Screen/Screen";
import { ChartModalProvider } from "@/src/features/chart/contexts/ChartModalContext";
import { GroupMembersBalanceChartProvider } from "@/src/features/chart/contexts/GroupMembersBalanceChartContext";
import { TransactionCategoriesChartProvider } from "@/src/features/chart/contexts/TransactionCategoriesChartContext";
import GroupLatestTransactions from "@/src/features/group/components/layout/GroupLatestTransactions";
import GroupLatestUsers from "@/src/features/group/components/layout/GroupLatestUsers";
import GroupMembersChart from "@/src/features/group/components/layout/GroupMembersChart";
import GroupTransactionCategoriesChart from "@/src/features/group/components/layout/GroupTransactionCategoriesChart";
import { useGroup } from "@/src/features/group/contexts/GroupContext";
import { Stack } from "expo-router";

const Group = () => {
	//#region Hooks
	const { group } = useGroup();
	// #endregion

	return (
		<Screen>
			<Stack.Screen options={{ title: group?.name }} />

			<Screen.ScrollView>
				<Screen.Container>
					<ChartModalProvider>
						<GroupMembersBalanceChartProvider>
							<GroupMembersChart />
						</GroupMembersBalanceChartProvider>
					</ChartModalProvider>

					<ChartModalProvider>
						<TransactionCategoriesChartProvider>
							<GroupTransactionCategoriesChart />
						</TransactionCategoriesChartProvider>
					</ChartModalProvider>

					<GroupLatestTransactions />

					<GroupLatestUsers />
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

export default Group;
