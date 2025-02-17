// import mongoose from "mongoose";

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://ajayranadr005:4kUWc4LeSxcRXyKT@cluster0.a9rjj.mongodb.net/food-delivery?retryWrites=true&w=majority&appName=Cluster0')
//     .then(() => console.log("DB Connected"))
//     .catch(err => console.log("DB Connection Error:", err));
// };






// 4kUWc4LeSxcRXyKT
// ajayranadr005

// mongodb+srv://ajayranadr005:<db_password>@cluster0.a9rjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout for faster failure
        });
        console.log("✅ DB Connected Successfully");
    } catch (err) {
        console.error("❌ DB Connection Error:", err.message);
    }
};
