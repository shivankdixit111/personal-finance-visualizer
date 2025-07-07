'use client'

import { DatePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'  
import { categories } from '@/constants/category'
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Select } from '@/components/ui/select'  
import React, { InputEvent, useEffect, useState } from 'react' 
import { useParams, useRouter } from 'next/navigation'
import { useTransactionData } from '@/context/TransactionContext'


type transactionType =  {
    _id: string,
    amount: number,
    category: string,
    date: string,
    description: string, 
}

const page = () => {
  const router = useRouter();
  const { id } = useParams(); 
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { setLoading, loading, setRefreshTransaction } = useTransactionData();


  useEffect(()=> {
    async function getData() {
        try {
            const response = await fetch(`/api/Transaction/${id}`, {
                method: "GET"
            })
            const data: transactionType = await response.json();
            if(response.ok) {
                setAmount(data.amount);
                setDate(new Date(data.date))
                setDescription(data.description)
                setCategory(data.category)
            }
        } catch(error) {
           console.log(error)
        }
    }
    getData();
  },[])

  const handleSubmit = async(e: React.FormEvent)=> {
    e.preventDefault();
     console.log('form is ', `/api/Transaction/${id}`)
    const body = {
      amount,
      date,
      description,
      category,
    } 
    setLoading(true)
    const response = await fetch(`/api/Transaction/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json();
    if(response.ok) {
      alert("Transaction updated successfully")
    } else {
      alert(data.message)
    } 
    setRefreshTransaction(prev=> !prev)
    router.replace('/Transactions')
  }

  return (  
    <div className='flex justify-center min-h-screen bg-muted px-4'> 
        <form onSubmit={handleSubmit} className='w-full h-[60%] mt-15 max-w-md bg-white p-6 rounded-xl shadow-lg space-y-5'>
            <h2 className='text-2xl font-semibold text-center text-primary'>Edit Transaction</h2>
            <div className='space-y-2'>
              <Label htmlFor='amount'>Transaction Amount</Label>
              <Input 
                type='number'
                name='amount' id='amount'
                placeholder='eg. 1000'
                value={amount ? amount : ""}
                onChange={(e)=> setAmount(Number(e.target.value))}
              />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='date'>Date</Label>
                <DatePicker setDate={setDate} date={date}/> 
            </div>
            <div className='space-y-2'>
              <Label htmlFor='descriptioin'>Description</Label>
              <Textarea 
                name="descriptioin" id="descriptioin" 
                placeholder='Eg. grocery, uber'
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
              >
              </Textarea>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='category'>Category</Label>
               <Select onValueChange={(value)=> setCategory(value)} value={category}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      {
                        categories.map((c,idx)=> (
                           <SelectItem key={idx} value={c}>{c}</SelectItem> 
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select> 
            </div>
          <Button className='mt-4 w-full'>Save</Button>
        </form>
    </div>
  )
}

export default page