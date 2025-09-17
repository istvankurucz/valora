import ListContainer from "@/src/components/layout/ListContainer";
import SectionTitle from "@/src/components/ui/SectionTitle";
import ThemedView from "@/src/components/ui/ThemedView";
import { Link } from "expo-router";
import useGetAccounts from "../../hooks/useGetAccounts";
import AccountListItem from "../ui/AccountListItem";

const AccountsList = () => {
	//#region Hooks
	const { accounts } = useGetAccounts();
	//#endregion

	return (
		<ThemedView>
			<SectionTitle>Accounts</SectionTitle>

			<ListContainer>
				{accounts.map((account) => (
					<Link key={account.id} href={`/accounts/${account.id}`} asChild>
						<AccountListItem account={account} />
					</Link>
				))}
			</ListContainer>
		</ThemedView>
	);
};

export default AccountsList;
