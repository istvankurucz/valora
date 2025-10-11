import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useError } from "../../error/contexts/ErrorContext";
import { useAdminUser } from "../../user/contexts/AdminUserContext";
import getTransactionsByUserId from "../services/getTransactionsByUserId";

// type Page = {
// 	transactions: Transaction[];
// 	nextPage?: number;
// };

const useGetTransactionsByAdminId = () => {
	// #region Hooks
	const { admin } = useAdminUser();
	const { setError } = useError();
	// #endregion

	// #region Query
	const { data, isLoading, error } = useQuery({
		enabled: admin !== null,
		queryKey: ["users", "admin", "transactions"],
		queryFn: () => getTransactionsByUserId(admin!.id),
	});

	// const { data, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery<
	// 	Page,
	// 	unknown,
	// 	InfiniteData<Page, number | undefined>,
	// 	unknown[],
	// 	number | undefined
	// >({
	// 	enabled: admin !== null,
	// 	queryKey: ["users", "admin", "transactions"],
	// 	initialPageParam: 1,
	// 	getNextPageParam: (lastPage) => lastPage.nextPage,
	// 	queryFn: ({ pageParam = 1 }) => getTransactionsByUserId(admin!.id, { page: pageParam }),
	// });
	//#endregion

	// #region Error handling
	useEffect(() => {
		if (error) setError(error);
	}, [error, setError]);
	//#endregion

	return {
		transactions: data ?? [],
		loading: isLoading,
		// transactions: data?.pages.flatMap((page) => page.transactions) ?? [],
		// loading: isFetchingNextPage,
		// loadMoreTransactions: fetchNextPage,
		// hasMoreTransactions: hasNextPage,
	};
};

export default useGetTransactionsByAdminId;
