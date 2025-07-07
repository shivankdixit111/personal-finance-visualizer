'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react'
import { useTransactionData } from '@/context/TransactionContext'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation' 


export default function TransactionListDemo() {
  const router = useRouter();
  const { transactions, setRefreshTransaction, setLoading, loading, totalPages, page, setPage } = useTransactionData(); 

  if(loading) {
    return <Loader />
  }
  
  const handleDelete = async(id: string)=> {
     setLoading(true)
     const response = await fetch(`api/Transaction/${id}`, {
        method: "DELETE",
     })
     const data = await response.json();
     alert(data.message);
     if(response.ok) setRefreshTransaction(prev=> !prev)
  }

  const goToEditPage = async(id: string)=> {
    router.push(`/edit-transaction/${id}`)
  }

  function getButtonDisplayed() {
      let buttons: Array<string | number> = []

      if(totalPages<=5) {
        for(let i=1;i<=Math.min(totalPages, 5);i++) buttons.push(i);
        return buttons;
      }
      //1 2 3 ..... n    user click on first three buttons
      if(page <= 3) {
        for(let i=1;i<=3;i++) buttons.push(i);
        buttons.push("...");
        buttons.push(totalPages);
        return buttons;
      }
      //1 ..... n-2 n-1 n    user click on last three buttons
      if(page > totalPages-3) {
        buttons.push(1);
        buttons.push("...");
        for(let i=totalPages-2;i<=totalPages;i++) buttons.push(i); 
        return buttons;
      }

      //1....c c+1 c+2 ... n    c-> current page
      buttons.push(1);
      buttons.push("...");
      for(let i=page;i<=page+2;i++) buttons.push(i); 
      buttons.push("...");
      buttons.push(totalPages);

      return buttons;
    }

  return ( 
    <div className='min-h-screen bg-muted p-6'>
        <h1 className='text-3xl font-bold text-center text-primary mb-6'>Transactions</h1>
        {
            transactions.map((t)=> (
                <Card key={t._id} className='max-w-2xl mx-auto mb-4'>
                    <CardContent className='flex justify-between p-4'>
                        <div className='flex flex-col'>
                            <h4 className='text-lg font-bold text-primary mb-1'>₹ {t.amount}</h4>
                            <p className='text-sm text-gray-600 mb-2'>{t.description}</p>
                            <div className='flex items-center gap-1 text-sm'>
                                <Badge variant={'outline'}>{t.category}</Badge>
                                <span className='text-xs text-gray-700'>{new Date(t.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Button variant='outline' onClick={()=> goToEditPage(t._id)}>  
                                <Pencil className='h-4 w-4'/>
                            </Button>
                            <Button variant='destructive' onClick={()=> handleDelete(t._id)}>  
                                <Trash2 className='h-4 w-4'/>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))
        }
        {/* pagination  */}
        <div className='flex items-center justify-center gap-2'>
            <button className='h-10 w-10 cursor-pointer transition rounded-full bg-black text-white hover:bg-gray-600 flex items-center justify-center' onClick={()=> setPage(prev=> Math.max(1,prev-1))}>
               <ChevronLeft />
            </button>
            {
                getButtonDisplayed().map((b, idx)=> (
                    b==="..." ? 
                    (<span>...</span>)
                    : 
                    (
                        <button  className={`h-10 w-10 cursor-pointer transition rounded-full bg-black text-white hover:bg-gray-600 ${page==b ? "bg-gray-600" : ""}`} key={idx} onClick={()=> setPage(Number(b))}>
                            {b}
                        </button>
                    )
                ))
            }
            <button className='h-10 w-10 cursor-pointer transition rounded-full bg-black text-white hover:bg-gray-600 flex items-center justify-center' onClick={()=> setPage(prev=> Math.min(totalPages,prev+1))}>
               <ChevronRight />
            </button>
        </div>
    </div>
  )
}
