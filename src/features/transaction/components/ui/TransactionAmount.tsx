import ThemedText, { ThemedTextProps } from "@/src/components/ui/ThemedText";
import useFormatAmount from "@/src/features/user/hooks/useFormatAmount";
import { TransactionType } from "../../constants/transactionTypeOptions";

type Props = ThemedTextProps & {
	amount: number;
	transactionType: TransactionType;
};

const TransactionAmount = ({
	amount,
	transactionType,
	variant,
	shade,
	fontFamily,
	...rest
}: Props) => {
	// #region Hooks
	const { formatAmount } = useFormatAmount();
	//#endregion

	// #region Constants
	const amountVariant = transactionType === "income" ? "success" : "danger";
	const sign = transactionType === "income" ? "+" : "-";
	//#endregion

	return (
		<ThemedText variant={amountVariant} shade={500} fontFamily="Poppins_600SemiBold" {...rest}>
			{sign}
			{formatAmount(amount)}
		</ThemedText>
	);
};

export default TransactionAmount;
