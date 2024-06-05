// const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URI;
// new nodejs mongoclient
// const client = new MongoClint(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
