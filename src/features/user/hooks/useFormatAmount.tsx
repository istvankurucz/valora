import formatAmount from "@/src/utils/format/formatAmount";
import { useAdminUser } from "../contexts/AdminUserContext";

const useFormatAmount = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	//#endregion

	// #region Functions
	function formatAmountWithAdminCurrency(amount: number): string {
		return formatAmount(amount, admin?.currency ?? "USD");
	}
	//#endregion

	return { formatAmount: formatAmountWithAdminCurrency };
};

export default useFormatAmount;
