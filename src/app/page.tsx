'use client'

import { DatePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'  
import { categories } from '@/constants/category'
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Select } from '@/components/ui/select'  
import React, { useState } from 'react' 

const Page = () => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const handleSubmit = async(e: React.FormEvent)=> {
    e.preventDefault();
    const body = {
      amount,
      date,
      description,
      category,
    } 
    const response = await fetch('api/Transaction', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json();
    if(response.ok) {
      alert("Transaction added successfully")
    } else {
      alert(data.message)
    }
    setAmount(undefined);
    setDescription("")
    setDate(undefined)
  }

  return (  
    <div className='flex justify-center min-h-screen bg-muted px-4'> 
        <form onSubmit={handleSubmit} className='w-full h-[60%] mt-15 max-w-md bg-white p-6 rounded-xl shadow-lg space-y-5'>
            <h2 className='text-2xl font-semibold text-center text-primary'>Add Transaction</h2>
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
               <Select onValueChange={(value)=> setCategory(value)}>
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
          <Button className='mt-4 w-full'>Submit</Button>
        </form>
    </div>
  )
}

export default Page