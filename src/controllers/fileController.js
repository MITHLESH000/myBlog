// src/controllers/fileController.js
const cloudinary = require("../config/cloudinaryConfig");
const User = require("../models/userModels");

exports.uploadFile = async (req, res) => {
    try {
        const userDataCookie = req.cookies.userData;
        if (!userDataCookie) {
            return res.status(401).json({ error: "User is not logged in, redirecting to login." });
        }

        const userData = JSON.parse(userDataCookie);
        const username = userData.username;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!req.file) {
            // console.log("No file received");
            return res.status(400).json({ error: "No file provided" });
        }


        const result = await cloudinary.uploader.upload(req.file.path);

        const { userName, userEmail } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                username: userName || user.username,
                email: userEmail || user.email,
                url: result.secure_url,
                cloudinary_id: result.public_id
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "User uploaded successfully",
            file: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ error: `fileController: ${err.message}` });
    }
};
