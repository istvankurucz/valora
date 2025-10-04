export default function sortItemsByLatestTransaction<
	T extends { transactions: { timestamp: string }[] }
>(items: T[]): T[] {
	return items.sort((a, b) => {
		const aLatest = a.transactions.length
			? Math.max(...a.transactions.map((t) => new Date(t.timestamp).getTime()))
			: 0;
		const bLatest = b.transactions.length
			? Math.max(...b.transactions.map((t) => new Date(t.timestamp).getTime()))
			: 0;
		return bLatest - aLatest;
	});
}
