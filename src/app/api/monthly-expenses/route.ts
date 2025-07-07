import { connectToDB } from "@/lib/db";
import { Transaction } from "@/models/transaction.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
      await connectToDB();
      let {year} = await req.json(); 
      year = Number(year); 
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year+1}-01-01`);

      const monthlyExpenses = await Transaction.aggregate([
        {
            $match: {
                date: {
                    $gte: startDate,
                    $lte: endDate
                }
            },
        },
        {
            $group: {
                _id: { month: {$month: "$date"}},
                total: { $sum: "$amount" }
            }
        },
        {
           $sort: {"_id.month": 1}
        }
      ])  
      return NextResponse.json(monthlyExpenses, {status: 200})
   } catch(error) {
    console.log(error)
    return NextResponse.json({message: "Server error"}, {status: 200})
   }
}