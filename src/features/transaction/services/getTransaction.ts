import { db } from "@/src/db/db";
import AppError from "../../error/classes/AppError";
import { Transaction } from "../types/transactionTypes";
import getTransactionDetails from "./getTransactionDetails";

export default async function getTransaction(id: string): Promise<Transaction> {
	// Get transaction
	const transactionRaw = await db.query.TransactionTable.findFirst({
		where: (transaction, { eq }) => eq(transaction.id, id),
	});

	// Check transaction
	if (!transactionRaw) throw new AppError({ message: "Transaction not found." });

	// Get transaction details
	const transaction = await getTransactionDetails(transactionRaw);

	// Return transaction
	return transaction;
}
