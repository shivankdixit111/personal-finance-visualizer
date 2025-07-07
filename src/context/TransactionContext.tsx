'use client'

import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'  

type transactionType =  {
    _id: string,
    amount: number,
    category: string,
    date: string,
    description: string, 
}

type userDataContextType = {
    transactions: transactionType[], 
    setRefreshTransaction: Dispatch<SetStateAction<boolean>> // handles callback as well set(prev=> !prev) 
    loading: boolean, 
    setLoading: (val: boolean) => void, 
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    totalPages: number,
}

export const transactionDataContext = createContext<userDataContextType | undefined>(undefined)


const TransactionContext = ({children}: {children: ReactNode}) => {
  const [refreshTransaction, setRefreshTransaction] = useState<boolean>(false)
  const [transactions, setTransactions] = useState<Array<transactionType>>([]) 
  const [loading, setLoading] = useState<boolean>(false)
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);

  useEffect(()=> {
    async function findTodos() {
        const response = await fetch(`/api/Transaction/?page=${page}`, {
            method: "GET", 
        })
        
        const d = await response.json();
        console.log('transactions are ', d.data)

        if(response.ok) {
            setTransactions(d.data);
            setTotalPages(d.pages)
        }
        setLoading(false)
    }

    findTodos();
  }, [refreshTransaction, page])

  
  return (
    <transactionDataContext.Provider value={{transactions, setRefreshTransaction, loading, setLoading, setPage, page, totalPages}}>
       {children}
    </transactionDataContext.Provider>
  )
}

export default TransactionContext

export const useTransactionData = ()=> {
    const context = useContext(transactionDataContext);
    if(context === undefined) {
       throw new Error("Context cannot be undefined") 
    }
    return context;
}