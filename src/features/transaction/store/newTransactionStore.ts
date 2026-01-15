import { create } from "zustand";
import { Transaction } from "../types/transactionTypes";

type NewTransactionStore = {
	transaction: Transaction | null;
	setTransaction: (transaction: Transaction | null) => void;
};

export const useNewTransactionStore = create<NewTransactionStore>((set) => ({
	transaction: null,
	setTransaction: (transaction) => set({ transaction }),
}));
