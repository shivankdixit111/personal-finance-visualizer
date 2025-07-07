import { categories } from '@/constants/category'; 
import { z } from 'zod'

export const transactionSchema = z.object({
    amount: z.number({
        required_error: "Transaction Amount is required",
        invalid_type_error: "Transaction Amount must be a number",
    })
    .min(1, {message: "Transaction cann't be stored less than ₹0"})
    .max(10000000, {message: "Transaction cann't be stored more than  ₹1 crore"}),
    date: z.coerce.date({
        required_error: "Transaction Date is required",
        invalid_type_error: "Invalid date format",
    }),
    description: z.string({
        required_error: "Transaction Description is required",
        invalid_type_error: "Transaction Description must be text",
    })
    .min(3, {message: "Transaction Description must be atleast 3 characters long"}),
    category: z.enum(categories, {
        required_error: "Category is required",
        invalid_type_error: "Invalid category selected",
    })
})


export const validateTransaction = (body: unknown) => { 
    const result = transactionSchema.safeParse(body); 
    if(!result.success) {
        throw new Error(result.error.errors[0].message)
    }  
    return result.data;
}