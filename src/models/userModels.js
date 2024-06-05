const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { type } = require("os");

// const { MongoClient } = require("mongodb");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        default:'', // Default value if no email is provided
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String, // You can store the URL or path to the image
        default: '',  // Default value if no image is provided
    }
    
});

userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(this.password, salt);
        this.password = hashedpassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
