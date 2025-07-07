'use client'

import Monthly_Expenses_Bar from '@/components/BarChart'; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const Page = () => {
  const [year, setYear] = useState("")
  const [monthyExpenses, setMonthlyExpenses] = useState([]);
  const fullMonth:{month:string, value:number}[] = [];
  monthMap.forEach((m)=> (
    fullMonth.push({
        month: m,
        value: 0,
    })
  ))
  monthyExpenses.forEach((d: any)=>{
    const idx = d._id.month;
    fullMonth[idx-1].value = d.total; 
  })
 

  useEffect(()=> {
    if(year.length==0) return; 
    async function get_Monthly_Expenses() {
         const resposne = await fetch('/api/monthly-expenses', {
            method: "POST",
           
            body: JSON.stringify({year: year})
        })
        const data = await resposne.json();
        if(resposne.ok) {
            setMonthlyExpenses(data); 
        }
    }
    get_Monthly_Expenses();
  },[year])


  return (
    <div className='flex flex-col items-center gap-2 min-h-screen bg-muted p-6'> 
        <div>
            <h1 className='text-2xl font-bold text-center text-primary mb-2'>Know Your Monthly Expenses</h1>
            <p className="text-md text-center mb-2 text-gray-600 ">
                Please select a year to view your expense insights 📊
            </p>
        </div>
        <div> 
            <Select onValueChange={(val)=> setYear(val)}>
                <SelectTrigger className="w-[250px] border-black border-2">
                    <SelectValue className='placeholder:text-black' placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                {
                    years.map((y, idx)=> (
                        <SelectItem key={idx} value={y}>{y}</SelectItem> 
                    ))
                }
                </SelectContent>
            </Select>
        </div> 
        <div>
            <Monthly_Expenses_Bar fullMonth={fullMonth}/>
        </div> 
    </div>
  )
}

export default Page