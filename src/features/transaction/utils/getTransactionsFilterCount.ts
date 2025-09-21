import { INITIAL_DATE } from "@/src/constants/initialDate";
import { FilterTransactionsFormData } from "../constants/formData";

export default function getTransactionsFilterCount(filterData: FilterTransactionsFormData): number {
	// Init filter count
	let filterCount = 0;

	// Type
	if (filterData.types.length !== 2) filterCount++;

	// Categories
	if (filterData.categoryIds.length > 0) filterCount++;

	// Start date
	if (filterData.startDate !== INITIAL_DATE) filterCount++;

	// End date
	if (filterData.endDate !== INITIAL_DATE) filterCount++;

	// Accounts
	if (filterData.accountIds.length > 0) filterCount++;

	// Groups
	if (filterData.groupIds.length > 0) filterCount++;

	// Return filter count
	return filterCount;
}
