import Screen from "@/src/components/layout/Screen/Screen";
import { ChartModalProvider } from "@/src/features/chart/contexts/ChartModalContext";
import { TransactionCategoriesChartProvider } from "@/src/features/chart/contexts/TransactionCategoriesChartContext";
import GroupMemberBalanceChart from "@/src/features/group/components/layout/GroupMemberBalanceChart";
import GroupMemberTransactionCategoriesChart from "@/src/features/group/components/layout/GroupMemberTransactionCategoriesChart";
import GroupMemberTransactions from "@/src/features/group/components/layout/GroupMemberTransactions";
import { useGroupMember } from "@/src/features/group/contexts/GroupMemberContext";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import { Stack } from "expo-router";

const GroupMember = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	const { member } = useGroupMember();
	//#endregion

	return (
		<Screen>
			<Stack.Screen
				options={{ title: `${member?.name}${member?.id === admin?.id ? " (Me)" : ""}` }}
			/>

			<Screen.ScrollView>
				<Screen.Container>
					<GroupMemberBalanceChart />

					<ChartModalProvider>
						<TransactionCategoriesChartProvider>
							<GroupMemberTransactionCategoriesChart />
						</TransactionCategoriesChartProvider>
					</ChartModalProvider>

					<GroupMemberTransactions />
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

export default GroupMember;
