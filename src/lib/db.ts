import mongoose from 'mongoose'
import 'dotenv/config'

declare global {
    var Mongoose : {
        connection: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
    } | undefined
} 

const cached = global.Mongoose || {connection: null, promise: null}

export const connectToDB = async()=>{
    try {
       if(!cached.promise) {
         cached.promise = mongoose.connect(process.env.DB_URI!);
         cached.connection = await cached.promise;
       }
       return cached.connection;
    } catch(error) {
      console.log(error)
      console.log('Failed to connect to DB')
    }
}