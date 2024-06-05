const express = require("express");
const path = require("path");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");
const mongoose = require("mongoose");
const Blog = require("../models/blogModels");

const upload = require('../middlewares/multerConfig');
const fileController = require('../controllers/fileController');




// Middleware to parse cookies
router.use(cookieParser());
// Middleware to parse URL-encoded data (form data)
router.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON data
router.use(express.json());

router.use(express.static(path.join(__dirname, "../../public")));


// Route to render editor form
router.get("/editor", async (req, res) => {
    const userData = req.cookies.userData; // access the 'userData' cookie
    if (!userData) {
        
        return res.redirect("/login");
    } else {
        const user = JSON.parse(userData); // converting cookie JSON string to normal string
        const  userdb = await User.findOne(user);
        const imageUrl= userdb.url || '/img/icon/profilePic.jpeg';
        const userName = user.username;
        res.render("editor", { userName, imageUrl });
    }
});

// Route to search title
router.get("/search", async (req, res) => {
    const query = req.query.title;
    try {
        const blogs = await Blog.find({
            title: { $regex: query, $options: "i" },
        }).limit(7).select("title _id") // Case insensitive search
        res.status(200).json(blogs);
    } catch (error) {
        
        res.status(500).json(error+"Error fetching blogs");
    }
});
//Rout searchBlog to render blog page
router.get("/searchBlog", async (req, res) => {
    try {
        const blogId = req.query.id;
        
        const userData = req.cookies.userData; // Access the 'userData' cookie

        if (!userData) {
            
            return res.redirect("/login");
        } else {
            const user = JSON.parse(userData); // Convert cookie JSON string to an object
            const userName = user.username;
            const  userdb = await User.findOne(user);
            const imageUrl= userdb.url || '/img/icon/profilePic.jpeg';
            
            // Validate if blogId is a valid MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(blogId)) {
                return res.status(400).send("Invalid blog ID");
            }

            const blog = await Blog.findById(blogId); // Fetch the blog by ID

            if (!blog) {
                return res.status(404).send("Blog not found");
            }
            
            res.render("blog", { blog, userName, imageUrl }); // Pass the blog to blogPage.ejs to render the data
        }
    } catch (error) {
        
        res.status(500).json("Error in searchBlog route retrieving blog:", error);
    }
});


// Route to render blog page
router.get("/blogPage", async (req, res) => {
    try {
        const userData = req.cookies.userData; // access the 'userData' cookie
        if (!userData) {
            
            return res.redirect("/login");
        } else {
            const user = JSON.parse(userData); // converting cookie JSON string to normal string
            const userName = user.username;
            const  userdb = await User.findOne(user);
            const imageUrl= userdb.url || '/img/icon/profilePic.jpeg';
            const blogs = await Blog.find(); // Fetch all blogs from db
            
            res.render("blogPage", { blogs, userName ,imageUrl}); // pass the blogs to blogPage.ejs to render the data
        }
    } catch (error) {
        
        res.status(500).json("Error retrieving blogs:",error);
    }
});
// Route to render registation/signup form
router.get("/signup", (req, res) => {
    res.render("signup");
});
// Route to render login form
router.get("/login", (req, res) => {
    res.render("login");
});

//route to logout
router.get("/logout", function (req, res) {
    res.clearCookie("userData");
    res.sendFile(path.join(__dirname, "../../public/home.html"));
});

// route for user profile update
router.get("/profileForm", async (req, res) => {
    res.redirect("/updateUser");
});

//route to upload image file
router.post('/api/files/upload', upload.single('file'), fileController.uploadFile);

// Route to update user
// router.post("/updateUser", async (req, res) => {
//     try {
//         const userdata = req.cookies.userData; // access the 'userData' cookie
//         const { userName, userEmail } = req.body;
//         if (!userdata) {
//             console.log(
//                 `user is not logedin redirected from userProfile route`
//             );
//             return res.redirect("/login");
//         } else {
//             const userData = JSON.parse(userdata); // converting cookie JSON string to normal string
//             const username = userData.username;
//             const user = await User.findOne({ username }); // Fetch user data from db
//             if (!user) {
//                 return res.status(404).send("User not found");
//             }
//             const updatedUser = await User.findByIdAndUpdate(
//                 user._id,
//                 { username: userName, email: userEmail },
//                 { new: true, runValidators: true }
//             ); //
//             if (!updatedUser) {
//                 return res.status(404).send("User not found");
//             }

//             res.status(200).json(updatedUser);
//         }
//     } catch (error) {
//         if (error.code === 11000) {
//             return res.status(400).send("Duplicate field value entered");
//         }
//         console.error("Error updateUser :", error);
//         res.status(500).send(error + " Error in updateUser");
//     }
// });

// route for user profile
router.get("/userProfile",async (req, res) => {
    try {
        // access userName from the cookie
        const userData = req.cookies.userData;
        if (!userData) {
           
            return res.redirect("/login");
        } else {
            const user = JSON.parse(userData);
            const userName = user.username;
            const  userdb = await User.findOne(user);
            const imageUrl= userdb.url || '/img/icon/profilePic.jpeg';
            res.render("profileMenu", { userName, useremail:userdb.email, imageUrl}); 
        }
    } catch (error) {
        res.status(500).send(
            "accessing userName form cookie Error in routes-index.js file, userProfile route"
        );
    }
});


// Route to handle signup form submission
router.post("/signupForm", async (req, res) => {
    const {useremail, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            // console.log("User already exists. Prompting login.");
            return res.render("login", {
                message: "You already have an account. Please log in.",
            });
        }
        const newUser = new User({email:useremail, username, password, });
        await newUser.save();
        // console.log("Registered successfuly and Login auto");
        res.render("login", {
            message: " Registered successfuly and plese Login",
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send("Duplicate field value entered signupForm"+error);
        }
        // console.error('route signupForm route Error during registration:', error);
        res.status(500).json('Internal Server Error in signupForn route',error);
    }
});

//Route to handle Login form submission
router.post("/loginForm", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // const username= user.username;
                // Serialize user data into a JSON string
                const userData = JSON.stringify({ username: user.username });
                // Set a cookie named 'username' with the value from the form
                res.cookie("userData", userData, {
                    maxAge: 900000,
                    httpOnly: true,
                });
                // console.log(`cookie created`);
                
                res.redirect("/blogPage"); // redirect the route to /blogePage
            } else {
                res.render("login", { message: "Incorrect password" });
                // console.log("Incorrect password");
            }
        } else {
            // console.log("User not found. Please sign up");
            res.render("signup", {
                message: "User not found. Please sign up."
            });
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send("Duplicate field value entered "); // duplicate filds in db
        }
        const data = { message: `${error}` };
        res.status(500).send(data);
    }
});

// route to save blog in DB
router.post("/editorForm", async (req, res) => {
    try {
        const { title, content } = req.body;
        const userData = req.cookies.userData;
        if (!userData) {
            return res.status(401).send("User not authenticated please Login");
        } else {
            const user = JSON.parse(userData);
            // console.log(user.username);
            const author = user.username;
            const newBlog = new Blog({ title, content, author });
            await newBlog.save();
            res.status(201).send(`${title} blog is saved`);
        }
    } catch (error) {
        res.status(500).send(
            error + " Blog Error routes-index.js file, editorForm route"
        );
    }
});

// access cookie data userData=JSON.parse(req.cookie.userData); const {usrname, password} = userData;

// Route to render login form
router.get("/login", (req, res) => {
    res.render("login");
});

module.exports = router;
