import { connectToDB } from "@/lib/db";
import { validateTransaction } from "@/lib/validations/Transaction";
import { Transaction } from "@/models/transaction.model"; 
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest, { params }: { params: {id: string} }) {
    try { 
        const { id } = params; 
        
        await Transaction.findByIdAndDelete(id);
        return NextResponse.json({message: "Transaction deleted succssfully"}, {status: 200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({message: "Server error"}, {status: 400})
    }
}


export async function PATCH(req: NextRequest, {params}: {params: {id: string}}) {
    try {
      await connectToDB();
      const {id} = params;
      const body = await req.json(); 
      const parsedData = validateTransaction(body);  //validation 

      const {amount, date, description, category} = parsedData; 
      
      // --- update transaction ----- 
      await Transaction.findByIdAndUpdate(id, {amount, date, description, category})
      return NextResponse.json({message: "Transaction updated successfully"} ,{status: 200});
    } catch(error: any) {   
        console.log(error)
        return NextResponse.json({message: error.message}, {status: 400})
    }
}

export async function GET(req: NextRequest, { params }: { params: {id: string} }) {
    try { 
        const { id } = params; 
        
        const transaction = await Transaction.findById(id);
        return NextResponse.json(transaction, {status: 200})
    } catch(error) {
        console.log(error)
        return NextResponse.json({message: "Server error"}, {status: 400})
    }
}