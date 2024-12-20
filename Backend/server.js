const express = require("express");
const body_parse = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // Import JWT library
require('dotenv').config();  // To load environment variables
const multer = require('multer');
const path = require('path');

const UserModel = require("./Modules/user");
const FeedBackdetils = require("./Modules/Feedback")
const User = require("./Modules/user");
const authRegiser = require('./Routes/register');
const Question = require("./Modules/test");
const FeedBackDetails = require("./Modules/Feedback");
const { message } = require("antd");

const crouseSchema = require("./Modules/youtube")

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://vmkmano13:mano@kongu.lnpx7.mongodb.net/?retryWrites=true&w=majority&appName=kongu")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// const Username = ()=>{

//   const user = new User({UserName:"Rohini",name:"Rohini24MCR@kongu.edu",password:"01-09-2003"},

//   )

//   user.save()


// }

// Username();
app.post('/register', async (req, res) => {
  try {
    const { Username, name, password, department, confirmPassword } = req.body;


    console.log(Username)

    // Check if req.body exists and fields are not undefined
    if (!req.body || !Username || !name || !password || !department || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    // Validate fields
    if (!Username.trim() || !name.trim() || !password.trim() || !department.trim() || !confirmPassword.trim()) {
      return res.status(400).json({ message: 'All fields must be non-empty', success: false });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match', success: false });
    }

    const user = new User({ Username, name, password, department })

    user.save();

    if(user){
      res.json({message:"Register succuss full", success : true})
    }

   

    // Rest of your logic...
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
});


app.post('/Login', async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Name and password are required", success: false });
    }

    console.log("Login attempt:", name);

    // Check if user exists
    const user = await UserModel.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    // Verify password
    const isPasswordValid = bcrypt.compare(password, user.password); // Added await
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    console.log(user.Username);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, Username: user.Username, role: user.role },
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send the token and Username to the client
    res.json({
      message: "Login successful",
      success: true,
      token, // Send JWT token
      Username: user.Username // Include UserName in response
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});


// Middleware to verify the JWT token on protected routes
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing", success: false });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the folder where files will be uploaded
    cb(null, '.uploads/');
  },
  filename: (req, file, cb) => {
    // Set the file name with original name and current timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage engine
const upload = multer({ storage: storage });

app.post('/update', upload.single('file'), (req, res) => {
  try {
    // Log incoming data
    console.log('Request Body:', req.body);  // Log form fields
    console.log('Uploaded File:', req.file); // Log uploaded file details

    const { title, type, subject, semester, department } = req.body;
    const file = req.file;

    if (!file) {
      console.log("Error: No file uploaded");
      return res.status(400).json({ message: 'File is required.' });
    }

    // Additional checks and processing
    console.log('Title:', title);
    console.log('Type:', type);
    console.log('Subject:', subject);
    console.log('Semester:', semester);
    console.log('Department:', department);

    // Simulate a save to the database or further processing here

    // Success response
    return res.status(200).json({ message: 'Resource uploaded successfully!', file: file.filename });
  } catch (error) {
    console.error("Error during upload:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});





app.get("/users",async (req,res)=>{


  const user =await User.find()

try{
  res.json({Userdata: user})
}
catch(err){
  res.json({message:err})
}

})

///adding qustions
// const newQuestion = new Question({
//   text: 'What is the capital of France?',
//   options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
//   correctAnswer: 2,
// });

// newQuestion.save();

app.post('/Questionadd', async (req, res) => {

  const { text, options, correctAnswer } = req.body;

  try {
    const newQuestion = new Question({
      text,
      options,
      correctAnswer,
    });

    // Save the new question to the database
    await newQuestion.save();

    // Send a success response back
    res.status(201).json({ message: 'Question added successfully!', question: newQuestion });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Error adding question', error: error.message });
  }
});




app.get("/getquestion", async (req, res) => {
  try {
    // Fetch questions from the database
    const questions = await Question.find();

    // Send questions as a JSON response
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);

    // Send an error response
    res.status(500).json({
      message: "Failed to fetch questions",
      error: err.message,
    });
  }
});



app.post("/Feedback", async (req, res) => {
  const { name, Feedback, Rate } = req.body;

  try {
 
    const feed = new FeedBackDetails({ name, Feedback, Rate });


    await feed.save();

    
    res.status(201).json({ message: "Feedback submitted successfully", success: true });
  } catch (err) {
    console.error("Error saving feedback:", err);

    // Send error response
    res.status(500).json({ message: "Failed to submit feedback", success: false });
  }
});

app.get("/getfeedback", async (req, res) => {
  try {
    // Retrieve all feedback details from the database
    const feedbacks = await FeedBackDetails.find();

    // Check if feedbacks exist
    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedback found", success: false });
    }

    // Send the feedback data
    res.status(200).json({ data: feedbacks, success: true });
  } catch (err) {
    console.error("Error fetching feedback:", err);

    // Send error response
    res.status(500).json({ message: "Failed to retrieve feedback", success: false });
  }
});




app.post("/CrousePost",async (req,res)=>{


  const {title,channel,url,duration,rating,description,views,level,imageUrl} = req.body 

try{


  const Coursepost = new crouseSchema({
    title,
    channel,
    url,
    duration,
    rating,
    description,
    views,
    level,
    imageUrl
  })

  Coursepost.save()

  res.status(201).json({message:"Added submit feedback",success:true})
}catch(err){

  res.json({message:err,success :false})

}
  


})


app.get("/GetCrousePost", async (req, res) => {
  try {
    const getCrousePost = await crouseSchema.find();

    if (!getCrousePost || getCrousePost.length === 0) {
      return res.status(404).json({ message: "No feedback found", success: false });
    }

    // Send the response and stop further execution
    return res.status(200).json({ data: getCrousePost, success: true });
  } catch (err) {
    console.error("Error fetching courses:", err);

    // Ensure no further code runs after sending the response
    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed to fetch courses", success: false });
    }
  }
});








// Start the server


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






















