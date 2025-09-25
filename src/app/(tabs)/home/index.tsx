import Screen from "@/src/components/layout/Screen/Screen";
import AdminBalanceChart from "@/src/features/user/components/layout/AdminBalanceChart";
import AdminLatestTransactions from "@/src/features/user/components/layout/AdminLatestTransactions";
import AdminTransactionCategoriesChart from "@/src/features/user/components/layout/AdminTransactionCategoriesChart";
import AdminWelcome from "@/src/features/user/components/layout/AdminWelcome";
import { StyleSheet } from "react-native";

const Home = () => {
	return (
		<Screen hasHeader={false}>
			<Screen.ScrollView contentContainerStyle={styles.container}>
				<Screen.Container>
					<AdminWelcome />
					<AdminBalanceChart />
					<AdminTransactionCategoriesChart />
					<AdminLatestTransactions />
				</Screen.Container>
			</Screen.ScrollView>
		</Screen>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		paddingTop: 32,
	},
});

export default Home;
