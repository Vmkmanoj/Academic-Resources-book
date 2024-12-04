const express = require("express");

const User = require("../Modules/user")

const bcrypt = require('bcrypt');

const router = express.Router()


router.post('/', async (req, res) => {
  try {
    const { Username, name, password } = req.body;

    // Validate input
    if (!Username || !name || !password) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(409).json({ message: 'User ID already exists, try another', success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds for hashing

    console.log(hashedPassword);

    // Create and save the new user
    const newUser = new User({
      Username,
      name,
      department,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Register successful', success: true });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
});


module.exports = router;