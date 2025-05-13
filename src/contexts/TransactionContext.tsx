import { useCallback, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
    id: number
    description: string
    type: 'income' | 'outcome'
    price: number
    category: string
    createdAt: string
}

interface createTransactionInput {
    description: string
    price: number
    category: string
    type: 'income' | 'outcome'
}


interface TransactionContextType {
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: createTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode; //qualquer elemento valido no react
}


export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    const fetchTransactions = useCallback(async (query?: string) => {
        const response = await api.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query
            }

        })

        setTransactions(response.data)
    }, [])

    const createTransaction = useCallback(async (data: createTransactionInput) => {

        const { description, price, category, type } = data;

        const response = await api.post('transactions', {
            description,
            price,
            category,
            type,
            createdAt: new Date()

        })

        setTransactions(state => [response.data, ...state])
    },
        [] //array de dependências, caso precise de alguma variável de fora da função
    )

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions])

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}