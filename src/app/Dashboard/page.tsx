'use client'

import Loader from '@/components/Loader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card' 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTransactionData } from '@/context/TransactionContext';
import React, { useEffect, useState } from 'react'
import { Pie, ResponsiveContainer, PieChart, Cell } from 'recharts'

type transactionType =  {
    _id: string,
    amount: number,
    category: string,
    date: string,
    description: string, 
}
type dashboardDataType = { 
   _id: string,
    total: number,
    category: string,
    latestDate: Date,
}


const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const years = ["2020", "2021", "2022", "2023", "2024", "2025"];

const page = () => {
  const { transactions, loading, setLoading } = useTransactionData();
  const [year, setYear] = useState("")
  const [dashboardData, setDashboardData] = useState<Array<dashboardDataType>>([]);
  const [mostRecentTransactions, setMostRecentTransactions] = useState<Array<transactionType>>([]);

   useEffect(()=> { 
      setLoading(true)
      async function getDashboardData() {
           const response = await fetch('/api/dashboard', {
              method: "POST",
             
              body: JSON.stringify({year: year})
          })
          const d = await response.json();
          if(response.ok) {
             setDashboardData(d.dashboardData);
             setMostRecentTransactions(d.mostRecentTransactions);
          }
      }
      getDashboardData();
      setLoading(false)
    },[year])

    if(loading) {
        return <Loader />
    } 

  return (
    <div className='min-h-screen bg-muted p-6'>
        <div className='mb-2'>
            <h1 className='text-3xl font-bold text-center text-primary mb-2'>Dashboard</h1>
            <p className="text-md text-center text-gray-600 ">
                Please select a year to view your expense insights 📊
            </p>
        </div>

        <div className='flex justify-center mt-4 mb-4'> 
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

        {
            year.length ? 
            <div id='specific-year-data'>
                {/* Summary Cards  */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
                    <Card className='p-6'>
                        <CardContent>
                            <p className='text-muted-foreground mb-1'>Total Expenses</p>
                            <h2 className='text-2xl font-bold'>{dashboardData.reduce((sum,o)=> sum+o.total,0)}</h2>
                        </CardContent>
                    </Card>
                    <Card className='p-6'>
                        <CardContent>
                            <p className='text-muted-foreground mb-1'>Top Activity</p>
                            <h2 className='text-lg font-bold'>{dashboardData.length ? dashboardData[0].category: "N/A"}</h2>
                        </CardContent>
                    </Card>
                    <Card className='p-6'>
                        <CardContent>
                            <p className='text-muted-foreground mb-1'>Total Transactions</p>
                            <h2 className='text-lg font-bold'>{dashboardData.length}</h2>
                        </CardContent>
                    </Card>
                </div>

                {/* Pie Chart  */}
                <Card className='h-120'>
                    <CardContent className='h-full'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <PieChart width={600} height={600}>
                                <Pie data={dashboardData} outerRadius={180} dataKey='total' nameKey='category' label={({category, total})=> `${category}: ${total}`}>
                                    {
                                        dashboardData.map((entry, idx)=> (
                                            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]}/>
                                        ))
                                    }
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            : 
            <></>
        }
        
        <Card className='h-150 mt-4'>
            <CardContent className='h-full'>
                <h1 className='text-lg text-gray-600 text-center mb-6'>Most Recent Transaction</h1>
                {
                    mostRecentTransactions.map((m,idx)=> (
                        <div className='flex justify-between p-4 border-b-2 border-b-black'>
                            <div>
                                <h4 className='text-md'>{m.description}</h4>
                                <Badge variant='outline' className='font-bold'>{m.category}</Badge>
                            </div>
                            <h6 className='font-bold'> ₹ {m.amount}</h6>
                        </div>
                    ))
                }
            </CardContent>
        </Card>
    </div>
  )
}

export default page