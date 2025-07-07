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

      const dashboardData = await Transaction.aggregate([
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
                _id: "$category",
                total: { $sum: "$amount" },
                category: {$first: "$category"},
                latestDate: {$max: "$date"}
            }
        },
        {
           $sort: {"latestDate": -1}
        }
      ])  

      const mostRecentTransactions = await Transaction.find().sort({date: -1}).limit(5)

      return NextResponse.json({ dashboardData, mostRecentTransactions }, {status: 200})
   } catch(error) {
    console.log(error)
    return NextResponse.json({message: "Server error"}, {status: 200})
   }
}