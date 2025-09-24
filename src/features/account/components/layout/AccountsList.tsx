import ListContainer from "@/src/components/layout/ListContainer";
import Section from "@/src/components/ui/Section/Section";
import ThemedView from "@/src/components/ui/ThemedView";
import { Link } from "expo-router";
import { useAccounts } from "../../contexts/AccountsContext";
import AccountListItem from "../ui/AccountListItem";

const AccountsList = () => {
	//#region Hooks
	const { accounts } = useAccounts();
	//#endregion

	return (
		<ThemedView>
			<Section.Title>Accounts</Section.Title>

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
