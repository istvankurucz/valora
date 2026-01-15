import ThemedText from "@/src/components/ui/ThemedText";
import { SegmentedControlOption, SelectOption } from "@/src/types/uiTypes";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useMemo } from "react";
import AccountOption from "../../account/components/ui/AccountOption";
import useGetAccounts from "../../account/hooks/useGetAccounts";
import useFormData from "../../form/hooks/useFormData";
import GroupOption from "../../group/components/ui/GroupOption";
import useGetGroups from "../../group/hooks/useGetGroups";
import TransactionCategoryOption from "../../transactionCategory/components/ui/TransactionCategoryOption";
import useGetTransactionCategories from "../../transactionCategory/hooks/useGetTransactionCategories";
import { useAdminUser } from "../../user/contexts/AdminUserContext";
import { EDIT_TRANSACTION_FORM_DATA, NEW_TRANSACTION_FORM_DATA } from "../constants/formData";
import {
	TRANSACTION_RECURRING_OPTIONS,
	TransactionRecurring,
} from "../constants/transactionRecurringOptions";
import { TRANSACTION_TYPE_OPTIONS, TransactionType } from "../constants/transactionTypeOptions";
import { useEditTransactionStore } from "../store/editTransactionStore";

const useEditTransactionData = () => {
	// #region States
	const { data, updateData, setData } = useFormData(EDIT_TRANSACTION_FORM_DATA);
	//#endregion

	// #region Hooks
	const { admin } = useAdminUser();
	const { transactionCategories } = useGetTransactionCategories();
	const { accounts } = useGetAccounts();
	const { groups } = useGetGroups();
	const transaction = useEditTransactionStore((state) => state.transaction);
	const setTransaction = useEditTransactionStore((state) => state.setTransaction);
	//#endregion

	// #region Constants
	const TRANSACTION_CATEGORY_TYPE_OPTIONS: SegmentedControlOption<TransactionType>[] = useMemo(
		() =>
			TRANSACTION_TYPE_OPTIONS.map((option) => ({
				value: option,
				label: capitalizeString(option),
			})),
		[]
	);
	const CATEGORY_OPTIONS: SelectOption[] = useMemo(
		() =>
			transactionCategories
				.filter((category) => category.type === data.type)
				.map((category) => ({
					value: category.id,
					label: <TransactionCategoryOption transactionCategory={category} />,
				})),
		[transactionCategories, data.type]
	);
	const RECURRING_OPTIONS: SelectOption<TransactionRecurring | "">[] = useMemo(
		() => [
			{
				value: "",
				label: <ThemedText>Not recurring</ThemedText>,
			},
			...TRANSACTION_RECURRING_OPTIONS.map((option) => ({
				value: option,
				label: <ThemedText>{capitalizeString(option)}</ThemedText>,
			})),
		],
		[]
	);
	const ACCOUNT_OPTIONS: SelectOption[] = useMemo(
		() =>
			accounts.map((account) => ({
				value: account.id,
				label: <AccountOption account={account} />,
			})),

		[accounts]
	);
	const GROUP_OPTIONS: SelectOption[] = useMemo(
		() => [
			{
				value: "",
				label: <ThemedText>No group</ThemedText>,
			},
			...groups.map((group) => ({
				value: group.id,
				label: <GroupOption group={group} />,
			})),
		],
		[groups]
	);
	const MEMBER_OPTIONS: SelectOption[] = useMemo(
		() =>
			!admin
				? []
				: data.groupId
				? groups
						.find((group) => group.id === data.groupId)
						?.users.map((user) => ({
							value: user.id,
							label: (
								<ThemedText>
									{user.name} {user.id === admin.id ? "(Me)" : ""}
								</ThemedText>
							),
						})) ?? []
				: [{ value: admin.id, label: <ThemedText>{admin.name} (Me)</ThemedText> }],
		[admin, groups, data.groupId]
	);
	//#endregion

	// #region Functions
	function resetFormData() {
		setData({
			...NEW_TRANSACTION_FORM_DATA,
			timestamp: new Date(),
			accountId: accounts.find((account) => account.default)?.id ?? "",
			userId: admin?.id ?? "",
		});
	}

	function handleMemberChange(memberId: string) {
		// Update user ID
		updateData({ userId: memberId });

		// Member is not the admin
		if (memberId !== admin?.id) updateData({ accountId: "" });

		// Selected member is the admin but there is no account selected
		if (memberId === admin?.id && data.accountId === "") {
			// Get default account
			const defaultAccount = accounts.find((account) => account.default);

			// Check default account
			if (!defaultAccount) return;

			// Update data
			updateData({ accountId: defaultAccount.id });
		}
	}
	//#endregion

	useFocusEffect(
		useCallback(() => {
			// Do nothing on focus

			// Reset transaction to edit on blur
			return () => {
				setTransaction(null);
			};
		}, [setTransaction])
	);

	useEffect(() => {
		if (!transaction) return;

		// Update form data
		setData({
			type: transaction.type,
			amount: transaction.amount.toString(),
			label: transaction.label,
			note: transaction.note ?? "",
			timestamp: new Date(transaction.timestamp),
			recurring: transaction.recurring ?? "",
			categoryId: transaction.category.id,
			accountId: transaction.account?.id ?? "",
			groupId: transaction.group?.id ?? "",
			userId: transaction.user.id,
		});
	}, [transaction, setData]);

	return {
		transaction,
		data,
		setData,
		updateData,
		handleMemberChange,
		resetFormData,
		TRANSACTION_CATEGORY_TYPE_OPTIONS,
		CATEGORY_OPTIONS,
		RECURRING_OPTIONS,
		ACCOUNT_OPTIONS,
		GROUP_OPTIONS,
		MEMBER_OPTIONS,
	};
};

export default useEditTransactionData;
