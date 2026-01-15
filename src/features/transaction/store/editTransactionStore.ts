import { create } from "zustand";
import { Transaction } from "../types/transactionTypes";

type EditTransactionStore = {
	transaction: Transaction | null;
	setTransaction: (transaction: Transaction | null) => void;
};

export const useEditTransactionStore = create<EditTransactionStore>((set) => ({
	transaction: null,
	setTransaction: (transaction) => set({ transaction }),
}));
