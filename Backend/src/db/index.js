const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

const connectDB = async () => {
    try {
       await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
       console.log("DB Connection Successfull");
       
    } catch (error) {
        console.log("MongoDb connection failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;