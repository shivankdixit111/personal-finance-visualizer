import { connectToDB } from "@/lib/db";
import { validateTransaction } from "@/lib/validations/Transaction";
import { Transaction } from "@/models/transaction.model";
import { NextRequest, NextResponse } from "next/server";

 type ParamsType = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: ParamsType) {
  try {
    await connectToDB();
    const { id } = params;
    const transaction = await Transaction.findById(id);
    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest, { params }: ParamsType) {
  try {
    await connectToDB();
    const { id } = params;
    const body = await req.json();
    const parsedData = validateTransaction(body);
    const { amount, date, description, category } = parsedData;

    await Transaction.findByIdAndUpdate(id, {
      amount,
      date,
      description,
      category,
    });

    return NextResponse.json(
      { message: "Transaction updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PATCH error:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
  try {
    await connectToDB();
    const { id } = params;

    await Transaction.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 400 });
  }
}
