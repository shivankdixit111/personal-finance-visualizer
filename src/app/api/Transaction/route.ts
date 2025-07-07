import { connectToDB } from "@/lib/db";
import { transactionSchema, validateTransaction } from "@/lib/validations/Transaction";
import { Transaction } from "@/models/transaction.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
      await connectToDB();
      const page = parseInt(req.nextUrl.searchParams.get('page') || '1')
      const limit = 5;
      const skip = (page-1)*limit;

      const transactions = await Transaction.find({})
       .sort({date: -1})
       .skip(skip)
       .limit(limit);
 
       const total = await Transaction.countDocuments();


       return NextResponse.json({data: transactions, page, pages: Math.ceil(total/limit), total}, {status: 200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({message: "Server error"}, {status: 400})
    }
}

export async function POST(req: NextRequest) {
    try {
      await connectToDB();
      const body = await req.json(); 
      const parsedData = validateTransaction(body);  //validation 

      const {amount, date, description, category} = parsedData;
      //---- transaction exist check ---
      const transactionExist = await Transaction.findOne({amount, date, description, category})
      if(transactionExist) {
        return NextResponse.json({message: "Transaction already exist"}, {status: 400})
      }
      
      // --- create new transaction ----- 
      const newTransaction = await Transaction.create({amount, date, description, category})
      return NextResponse.json(newTransaction, {status: 200})
    } catch(error: any) {   
        return NextResponse.json({message: error.message}, {status: 400})
    }
}