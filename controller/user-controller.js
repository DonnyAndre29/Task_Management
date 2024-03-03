const User = require("../models/User"); // importing the User model

// Register User
const registerUser = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    console.log(user);

    // Check if the user is already registered.
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Create User
    await User.create(user)
      .then((user) => {
        res.status(201).json({
          message: "Registration successful",
          user,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "Something went wrong",
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Check if the provided password matches the stored password
    if (user.password === password) {
      return res.status(200).json({
        message: "Login successful",
        user: {
          email: user.email,
        },
      });
    } else {
      return res.status(401).json({
        message: "Email or password incorrect",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};