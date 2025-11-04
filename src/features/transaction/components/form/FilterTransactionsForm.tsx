import Checkbox from "@/src/components/form/Checkbox/Checkbox";
import FormDateInput from "@/src/components/form/DateInput/FormDateInput";
import Label from "@/src/components/form/Label";
import Select from "@/src/components/form/Select/Select";
import Button from "@/src/components/ui/Button";
import Section from "@/src/components/ui/Section/Section";
import useGetAccounts from "@/src/features/account/hooks/useGetAccounts";
import AppError from "@/src/features/error/classes/AppError";
import { useError } from "@/src/features/error/contexts/ErrorContext";
import useGetGroups from "@/src/features/group/hooks/useGetGroups";
import useGetTransactionCategories from "@/src/features/transactionCategory/hooks/useGetTransactionCategories";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { usePathname } from "expo-router";
import { Dispatch, Fragment, SetStateAction, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import SelectSortOption from "../../../../components/form/Select/SelectSortOption";
import {
	FILTER_TRANSACTIONS_FORM_DATA,
	FilterTransactionsFormData,
} from "../../constants/formData";
import { TRANSACTION_SORT_OPTIONS } from "../../constants/transactionSortOptions";
import { TransactionType } from "../../constants/transactionTypeOptions";
import { Transaction, TransactionSortProperty } from "../../types/transactionTypes";
import filterTransactions from "../../utils/filterTransactions";
import sortTransactions from "../../utils/sortTransactions";

type Props = {
	transactions: Transaction[];
	setTransactions: Dispatch<SetStateAction<Transaction[]>>;
	setFilterCount: Dispatch<SetStateAction<number>>;
	data: FilterTransactionsFormData;
	updateData: (newData: Partial<FilterTransactionsFormData>) => void;
};

const FilterTransactionsForm = ({
	transactions,
	setTransactions,
	setFilterCount,
	data,
	updateData,
}: Props) => {
	// #region Hooks
	const { transactionCategories } = useGetTransactionCategories();
	const { accounts } = useGetAccounts();
	const { groups } = useGetGroups();
	const { setError } = useError();
	const pathname = usePathname();
	//#endregion

	// #region Constants
	const incomeTransactionCategories = useMemo(
		() => transactionCategories.filter((category) => category.type === "income"),
		[transactionCategories]
	);
	const expenseTransactionCategories = useMemo(
		() => transactionCategories.filter((category) => category.type === "expense"),
		[transactionCategories]
	);
	const sortOptions = useMemo(
		() =>
			TRANSACTION_SORT_OPTIONS.map((option) => ({
				value: `${option.property}-${option.asc ? "asc" : "desc"}`,
				label: <SelectSortOption option={option} />,
			})),
		[]
	);

	const showAccounts = !pathname.includes("/accounts");
	const showGroups = !pathname.includes("/groups") && groups.length > 0;
	//#endregion

	// #region Functions
	function handleTypeCheckboxPress(type: TransactionType) {
		// Get array of new types
		let newTypes: TransactionType[] = [];
		if (data.types.includes(type)) {
			newTypes = data.types.filter((t) => t !== type);
		} else {
			newTypes = [...data.types, type];
		}

		// Remove not selected type categories
		const categoryIds = transactionCategories
			.filter((category) => category.type !== type)
			.map((category) => category.id);
		const newCategoryIds = data.categoryIds.filter((id) => categoryIds.includes(id));
		updateData({ types: newTypes, categoryIds: newCategoryIds });
	}

	function handleCategoryCheckboxPress(categoryId: string) {
		if (data.categoryIds.includes(categoryId)) {
			const newCategoryIds = data.categoryIds.filter((id) => id !== categoryId);
			updateData({ categoryIds: newCategoryIds });
		} else {
			const newCategoryIds = [...data.categoryIds, categoryId];
			updateData({ categoryIds: newCategoryIds });
		}
	}

	function handleAccountCheckboxPress(accountId: string) {
		if (data.accountIds.includes(accountId)) {
			const newAccountIds = data.accountIds.filter((id) => id !== accountId);
			updateData({ accountIds: newAccountIds });
		} else {
			const newAccountIds = [...data.accountIds, accountId];
			updateData({ accountIds: newAccountIds });
		}
	}

	function handleGroupCheckboxPress(groupId: string) {
		if (data.groupIds.includes(groupId)) {
			const newGroupIds = data.groupIds.filter((id) => id !== groupId);
			updateData({ groupIds: newGroupIds });
		} else {
			const newGroupIds = [...data.groupIds, groupId];
			updateData({ groupIds: newGroupIds });
		}
	}

	function handleSortChange(option: string) {
		// Get property and value
		const property = option.split("-")[0] as TransactionSortProperty;
		const asc = option.split("-")[1] === "asc";

		try {
			// Check values
			if (!property) throw new AppError({ message: "Invalid transaction sort property." });

			// Update data
			updateData({ sortProperty: property, sortAsc: asc });
		} catch (err) {
			setError(err);
		}
	}

	function handleResetPress() {
		updateData(FILTER_TRANSACTIONS_FORM_DATA);
		// setFilterCount(0);
	}

	function handleFilterPress() {
		// Filter transactions
		const filteredTransactions = filterTransactions(transactions, data);

		// Sort transactions
		const sortedTransactions = sortTransactions(filteredTransactions, data);

		// Update state
		setTransactions(sortedTransactions);
		// setFilterCount(getTransactionsFilterCount(data));
	}
	//#endregion

	return (
		<View style={styles.container}>
			<View>
				<Section.Title>Transaction types</Section.Title>
				<Section style={styles.checkboxContainer}>
					<Pressable
						hitSlop={4}
						style={styles.checkbox}
						onPress={() => handleTypeCheckboxPress("income")}
					>
						<Checkbox value={data.types.includes("income")} />
						<Label>Incomes</Label>
					</Pressable>
					<Pressable
						hitSlop={4}
						style={styles.checkbox}
						onPress={() => handleTypeCheckboxPress("expense")}
					>
						<Checkbox value={data.types.includes("expense")} />
						<Label>Expenses</Label>
					</Pressable>
				</Section>
			</View>

			<View>
				<Section.Title>Categories</Section.Title>
				<Section style={styles.checkboxContainer}>
					{data.types.includes("income") && (
						<Fragment>
							<Section.Title style={styles.categoryTitle}>Income categories</Section.Title>
							{incomeTransactionCategories.map((category) => (
								<Pressable
									key={category.id}
									hitSlop={4}
									style={styles.checkbox}
									onPress={() => handleCategoryCheckboxPress(category.id)}
								>
									<Checkbox value={data.categoryIds.includes(category.id)} />
									<Label>{capitalizeString(category.name)}</Label>
								</Pressable>
							))}
						</Fragment>
					)}

					{data.types.includes("expense") && (
						<Fragment>
							<Section.Title style={styles.categoryTitle}>Expense categories</Section.Title>
							{expenseTransactionCategories.map((category) => (
								<Pressable
									key={category.id}
									hitSlop={4}
									style={styles.checkbox}
									onPress={() => handleCategoryCheckboxPress(category.id)}
								>
									<Checkbox value={data.categoryIds.includes(category.id)} />
									<Label>{capitalizeString(category.name)}</Label>
								</Pressable>
							))}
						</Fragment>
					)}
				</Section>
			</View>

			<View>
				<Section.Title>Dates</Section.Title>
				<Section style={styles.datesContainer}>
					<View style={styles.dateContainer}>
						<FormDateInput
							field=""
							label="Start date"
							mode="date"
							date={data.startDate}
							onValueChange={(startDate) => updateData({ startDate })}
						/>
					</View>
					<View style={styles.dateContainer}>
						<FormDateInput
							field=""
							label="End date"
							mode="date"
							date={data.endDate}
							onValueChange={(endDate) => updateData({ endDate })}
						/>
					</View>
				</Section>
			</View>

			{showGroups && (
				<View>
					<Section.Title>Groups</Section.Title>
					<Section style={styles.checkboxContainer}>
						{groups.map((group) => (
							<Pressable
								key={group.id}
								hitSlop={4}
								style={styles.checkbox}
								onPress={() => handleGroupCheckboxPress(group.id)}
							>
								<Checkbox value={data.groupIds.includes(group.id)} />
								<Label>{group.name}</Label>
							</Pressable>
						))}
					</Section>
				</View>
			)}

			{showAccounts && (
				<View>
					<Section.Title>Accounts</Section.Title>
					<Section style={styles.checkboxContainer}>
						{accounts.map((account) => (
							<Pressable
								hitSlop={4}
								key={account.id}
								style={styles.checkbox}
								onPress={() => handleAccountCheckboxPress(account.id)}
							>
								<Checkbox value={data.accountIds.includes(account.id)} />
								<Label>{account.name}</Label>
							</Pressable>
						))}
					</Section>
				</View>
			)}

			<View>
				<Section.Title>Sort transactions</Section.Title>
				<Section>
					<Select
						options={sortOptions}
						value={`${data.sortProperty}-${data.sortAsc ? "asc" : "desc"}`}
						onValueChange={handleSortChange}
					/>
				</Section>
			</View>

			<View style={styles.buttons}>
				<Button title="Reset filters" outlined onPress={handleResetPress} />
				<Button title="Filter transactions" onPress={handleFilterPress} />
			</View>
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		gap: 24,
	},
	checkboxContainer: {
		gap: 16,
	},
	checkbox: {
		alignSelf: "flex-start",
		flexDirection: "row",
		gap: 8,
	},
	categoryTitle: {
		marginBottom: -4,
	},
	datesContainer: {
		flexDirection: "row",
		gap: 32,
		paddingBottom: -16,
	},
	dateContainer: {
		flex: 1,
	},
	buttons: {
		gap: 12,
	},
});

export default FilterTransactionsForm;
