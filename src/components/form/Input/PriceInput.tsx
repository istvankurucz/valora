import { BORDER_RADIUS } from "@/src/constants/borderRadius";
import { FONT_SIZE } from "@/src/constants/fontSizes";
import { useFormValidation } from "@/src/features/form/contexts/FormValidationContext";
import { TransactionType } from "@/src/features/transaction/constants/transactionTypeOptions";
import { useAdminUser } from "@/src/features/user/contexts/AdminUserContext";
import useFormatAmount from "@/src/features/user/hooks/useFormatAmount";
import useThemeColor from "@/src/hooks/useThemeColor";
import getCurrencySymbol from "@/src/utils/string/getCurrencySymbol";
import { forwardRef, useRef } from "react";
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import ThemedText from "../../ui/ThemedText";
import ThemedView from "../../ui/ThemedView";
import FieldError from "../FieldError";
import InputContainer from "../InputContainer";

type Props = TextInputProps & {
	field: string;
	type: TransactionType;
};

const PriceInput = forwardRef<TextInput, Props>(
	({ field, type, keyboardType, value, onChangeText, style, ...rest }, ref) => {
		// #region Refs
		const textInputRef = useRef<TextInput>(null);
		//#endregion

		// #region Hooks
		const { admin } = useAdminUser();
		const { formatAmount } = useFormatAmount();
		const { getErrorByField } = useFormValidation();

		const incomeColor = useThemeColor({ variant: "success", shade: 400 });
		const expenseColor = useThemeColor({ variant: "danger", shade: 400 });
		//#endregion

		//#region Constants
		const sign = value ? (type === "income" ? "+" : "-") : " ";
		const currencySymbol = getCurrencySymbol(admin?.preferences.currency ?? "USD");
		const formattedValue = value ? formatAmount(parseFloat(value)) : "";
		const formattedNumber = formattedValue
			.split(currencySymbol.symbol)
			[currencySymbol.position === "before" ? 1 : 0]!.trim();

		const error = getErrorByField(field);
		//#endregion

		// #region Functions
		function handleValuePress() {
			// Focus text input
			textInputRef.current?.focus();
		}

		function handleChangeText(text: string) {
			// Remove all non-numeric characters except for the decimal point
			const cleanedText = text.replace(/[^0-9.]/g, "");

			// Run custom handler
			onChangeText?.(cleanedText);
		}
		//#endregion

		return (
			<InputContainer>
				<Pressable onPress={handleValuePress}>
					<ThemedView shade={100} style={styles.container}>
						{currencySymbol.position === "before" && (
							<ThemedText
								style={[
									styles.symbol,
									{ color: type === "income" ? incomeColor : expenseColor },
								]}
							>
								{currencySymbol.symbol}
							</ThemedText>
						)}

						<View style={styles.valueContainer}>
							<ThemedText
								fontFamily="Poppins_600SemiBold"
								style={[
									styles.sign,
									{ color: type === "income" ? incomeColor : expenseColor },
								]}
							>
								{sign}
							</ThemedText>
							<TextInput
								keyboardType={keyboardType ?? "decimal-pad"}
								placeholderTextColor={type === "income" ? incomeColor : expenseColor}
								value={formattedNumber}
								onChangeText={handleChangeText}
								style={[
									styles.input,
									{ color: type === "income" ? incomeColor : expenseColor },
									style,
								]}
								{...rest}
								ref={textInputRef}
							/>
						</View>

						{currencySymbol.position === "after" && (
							<ThemedText
								style={[
									styles.symbol,
									{ color: type === "income" ? incomeColor : expenseColor },
								]}
							>
								{currencySymbol.symbol}
							</ThemedText>
						)}
					</ThemedView>
				</Pressable>

				<FieldError>{error?.message ?? ""}</FieldError>
			</InputContainer>
		);
	}
);

// Display name
PriceInput.displayName = "PriceInput";

// Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 4,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: BORDER_RADIUS[500],
	},
	valueContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		fontFamily: "Poppins_600SemiBold",
		fontSize: FONT_SIZE[800],
		textAlign: "center",
		// backgroundColor: "red",
	},
	sign: {
		fontSize: FONT_SIZE[700],
	},
	symbol: {
		fontSize: FONT_SIZE[700],
	},
});

export default PriceInput;
