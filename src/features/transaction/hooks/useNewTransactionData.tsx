import ThemedText from "@/src/components/ui/ThemedText";
import { SegmentedControlOption, SelectOption } from "@/src/types/uiTypes";
import capitalizeString from "@/src/utils/string/capitalizeString";
import { useFocusEffect, usePathname } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import AccountOption from "../../account/components/ui/AccountOption";
import useGetAccounts from "../../account/hooks/useGetAccounts";
import { useFeedback } from "../../feedback/contexts/FeedbackContext";
import useFormData from "../../form/hooks/useFormData";
import GroupOption from "../../group/components/ui/GroupOption";
import useGetGroups from "../../group/hooks/useGetGroups";
import { useLastPathname } from "../../navigation/contexts/LastPathnameContext";
import TransactionCategoryOption from "../../transactionCategory/components/ui/TransactionCategoryOption";
import useGetTransactionCategories from "../../transactionCategory/hooks/useGetTransactionCategories";
import { useAdminUser } from "../../user/contexts/AdminUserContext";
import { NEW_TRANSACTION_FORM_DATA } from "../constants/formData";
import {
	TRANSACTION_RECURRING_OPTIONS,
	TransactionRecurring,
} from "../constants/transactionRecurringOptions";
import { TRANSACTION_TYPE_OPTIONS, TransactionType } from "../constants/transactionTypeOptions";
import { useNewTransactionStore } from "../store/newTransactionStore";
import { Transaction } from "../types/transactionTypes";
import getLatestTransactions from "../utils/getLatestTransactions";
import useGetTransactionsByAdminId from "./useGetTransactionsByAdminId";

const ACCOUNT_PATH_REGEX =
	/\/accounts\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})/;
const GROUP_PATH_REGEX =
	/\/groups\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})/;
const MEMBER_PATH_REGEX =
	/\/members\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})/;
const TRANSACTION_CATEGORY_PATH_REGEX =
	/\/transaction-categories\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})/;

const useNewTransactionData = () => {
	// #region Hooks
	const pathname = usePathname();
	const { pathname: lastPathname } = useLastPathname();
	const { admin } = useAdminUser();
	const { transactions } = useGetTransactionsByAdminId();
	const { transactionCategories } = useGetTransactionCategories();
	const { accounts } = useGetAccounts();
	const { groups } = useGetGroups();
	const { data, updateData, setData } = useFormData(NEW_TRANSACTION_FORM_DATA);
	const { setFeedback } = useFeedback();
	const transaction = useNewTransactionStore((state) => state.transaction);
	const setTransaction = useNewTransactionStore((state) => state.setTransaction);
	//#endregion

	useEffect(() => {
		if (pathname !== "/new-transaction" || !transaction) return;

		// Update form data
		setData({
			type: transaction.type,
			amount: transaction.amount.toString(),
			label: transaction.label,
			note: transaction.note ?? "",
			timestamp: new Date(),
			recurring: transaction.recurring ?? "",
			categoryId: transaction.category.id,
			accountId: transaction.account?.id ?? "",
			groupId: transaction.group?.id ?? "",
			userId: transaction.user.id,
		});
	}, [pathname, transaction, setData]);

	useFocusEffect(
		useCallback(() => {
			// Do nothing on focus

			// Reset form data on blur
			return () => {
				setData(NEW_TRANSACTION_FORM_DATA);
				setTransaction(null);
			};
		}, [setData, setTransaction])
	);

	// #region Constants
	const TRANSACTION_CATEGORY_TYPE_OPTIONS: SegmentedControlOption<TransactionType>[] = useMemo(
		() =>
			TRANSACTION_TYPE_OPTIONS.map((option) => ({
				value: option,
				label: capitalizeString(option),
			})),
		[]
	);
	const latestTransactions: Transaction[] = useMemo(
		() => getLatestTransactions(transactions, data.type, { count: 5 }),
		[transactions, data.type]
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

	const showFeedback = pathname === "/new-transaction";
	//#endregion

	// #region Functions
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

	function resetFormData() {
		setData({
			...NEW_TRANSACTION_FORM_DATA,
			timestamp: new Date(),
			accountId: accounts.find((account) => account.default)?.id ?? "",
			userId: admin?.id ?? "",
		});
	}
	//#endregion

	// Set user ID
	useEffect(() => {
		if (pathname !== "/new-transaction" || !admin) return;

		// Update data
		setData((data) => ({ ...data, userId: admin.id }));
	}, [pathname, admin, setData]);

	// Set account ID
	useEffect(() => {
		if (pathname !== "/new-transaction") return;

		const accountMatch = ACCOUNT_PATH_REGEX.exec(lastPathname);
		if (accountMatch) {
			// Get account ID
			const accountId = accountMatch[1];

			// Check account ID and admin
			if (!accountId || !admin) return;

			// Update data
			setData((data) => ({ ...data, accountId, userId: admin.id, groupId: "" }));

			if (showFeedback) {
				// Show feedback
				setFeedback({
					type: "info",
					message: "Account was set automatically.",
				});
			}

			return;
		}

		if (transaction) return;

		// Get default account
		const defaultAccount = accounts.find((account) => account.default);

		// Check default account
		if (!defaultAccount) return;

		// Update data
		setData((data) => ({ ...data, accountId: defaultAccount.id }));
	}, [
		pathname,
		data.type,
		lastPathname,
		transaction,
		accounts,
		admin,
		setData,
		setFeedback,
		showFeedback,
	]);

	// Set group ID
	useEffect(() => {
		const groupMatch = GROUP_PATH_REGEX.exec(lastPathname);
		if (groupMatch) {
			// Get group ID
			const groupId = groupMatch[1];

			// Check group ID
			if (!groupId) return;

			// Update data
			setData((data) => ({ ...data, groupId }));

			const memberMatch = MEMBER_PATH_REGEX.exec(lastPathname);
			if (memberMatch) {
				// Get member ID
				const memberId = memberMatch[1];

				// Check member ID
				if (!memberId) return;

				// Update data
				setData((data) => ({ ...data, userId: memberId, accountId: "" }));

				if (showFeedback) {
					// Show feedback
					setFeedback({
						type: "info",
						message: "Group and member was set automatically.",
					});
				}
			} else {
				// Check admin
				if (!admin) return;

				// Update data
				setData((data) => ({ ...data, userId: admin.id }));

				if (showFeedback) {
					// Show feedback
					setFeedback({
						type: "info",
						message: "Group was set automatically.",
					});
				}
			}

			return;
		}
	}, [data.type, lastPathname, admin, setData, setFeedback, showFeedback]);

	// Set category
	useEffect(() => {
		const categoryMatch = TRANSACTION_CATEGORY_PATH_REGEX.exec(lastPathname);
		if (categoryMatch) {
			// Get category
			const categoryId = categoryMatch[1];
			const category = transactionCategories.find((category) => category.id === categoryId);

			// Check xategory
			if (!category) return;

			// Update data
			setData((data) => ({ ...data, categoryId: category.id, type: category.type }));

			if (showFeedback) {
				// Show feedback
				setFeedback({
					type: "info",
					message: "Category was set automatically.",
				});
			}

			return;
		}
	}, [data.type, lastPathname, setData, setFeedback, showFeedback, transactionCategories]);

	return {
		data,
		updateData,
		setData,
		handleMemberChange,
		resetFormData,
		TRANSACTION_CATEGORY_TYPE_OPTIONS,
		latestTransactions,
		CATEGORY_OPTIONS,
		RECURRING_OPTIONS,
		ACCOUNT_OPTIONS,
		GROUP_OPTIONS,
		MEMBER_OPTIONS,
		lastPathname,
	};
};

export default useNewTransactionData;
