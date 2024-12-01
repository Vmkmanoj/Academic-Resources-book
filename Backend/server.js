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
const User = require("./Modules/user");
const authRegiser = require('./Routes/register')

const PORT = 3000;
const app = express();

app.use(cors());
app.use(body_parse.json());

mongoose.connect("mongodb+srv://vmkmano13:mano@kongu.lnpx7.mongodb.net/?retryWrites=true&w=majority&appName=kongu")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// const Username = ()=>{

//   const user = new User({UserName:"Rohini",name:"Rohini24MCR@kongu.edu",password:"01-09-2003"},
                          
//   )

//   user.save()


// }

// Username();

app.use('/api/Register',authRegiser)

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

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, Username: user.UserName, role: user.role },
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send the token and Username to the client
    res.json({
      message: "Login successful",
      success: true,
      token, // Send JWT token
      userName: user.UserName // Include UserName in response
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
  
  
  // Start the server


  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });






















