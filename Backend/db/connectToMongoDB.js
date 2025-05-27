import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async () => {
   try {
        await mongoose.connect(process.env.MONGO_URL);
         mongoose.set("debug",true);
         
        console.log("connection is stablished");
    } catch (error) {
        console.log(error)
    }
};

export default connectToMongoDB;
// mongodb_password=T6VCNRjVFURhTGHc