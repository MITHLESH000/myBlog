const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { type } = require("os");

// const { MongoClient } = require("mongodb");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        default: "", // Default value if no email is provided
    },
    password: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
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
