import { categories } from "@/constants/category";
import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }, 
    category: {
        type: String,
        enum: categories,
        required: true,
    }
})
export const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);