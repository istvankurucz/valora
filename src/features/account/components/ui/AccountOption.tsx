import IconBox from "@/src/components/ui/IconBox";
import ThemedText from "@/src/components/ui/ThemedText";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { StyleSheet, View, ViewProps } from "react-native";
import { Account } from "../../types/accountTypes";

type Props = ViewProps & {
	account: Account;
};

const AccountOption = ({ account, style, ...rest }: Props) => {
	return (
		<View style={[styles.container, style]} {...rest}>
			<IconBox icon={{ ...account.icon, size: 20 }} style={styles.iconBox} />
			<ThemedText>{capitalizeString(account.name)}</ThemedText>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 24,
		alignItems: "center",
	},
	iconBox: {
		width: 48,
		height: 48,
	},
});

export default AccountOption;
