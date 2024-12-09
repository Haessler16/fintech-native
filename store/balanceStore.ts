import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from './mmkv-storage'

export interface Transaccion {
  id: string
  amount: number
  date: Date
  title: string
}

export interface BalanceState {
  transactions: Transaccion[]
  setTransaction: (transaction: Transaccion) => void
  balance: () => number
  clearTransactions: () => void
}

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      setTransaction: (transaction: Transaccion) => {
        set((state) => ({ transactions: [...state.transactions, transaction] }))
      },
      balance: () => {
        return get().transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0,
        )
      },
      clearTransactions: () => {
        set({ transactions: [] })
      },
    }),
    {
      name: 'balance-store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
