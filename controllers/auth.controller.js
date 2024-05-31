import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Joi from "joi";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if any of the required fields are missing
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Make sure all fields are filled" });
        }   
   

        // Define Joi schema for input validation
        const schema = Joi.object({
            username: Joi.string().min(4).max(30).required(),
            email: Joi.string().email().min(12).max(40).required(),
            password: Joi.string().min(8).max(30).required(),
        });

        // Validate the request body against the schema
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Check if the email is already registered
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken" });
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF8F33', '#8F33FF', '#33FFF5'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            color:randomColor
        });

        // Save the new user to the database
        await newUser.save();

        // Generate token and set it in a cookie
        // generateTokenAndSetCookie(newUser._id, res);

        // Respond with the newly created user data
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,  message:"User account created successfully"
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if username and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide both username and password" });
        }

        // Find the user by username
        const user = await User.findOne({ email });

        // If user doesn't exist, return error
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Compare password with hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // If password is incorrect, return error
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate token and set it in a cookie
        generateTokenAndSetCookie(user._id, res);

        // Respond with user data
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            color:user.color,
            message:"Loggged in successfully"
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None'
    });
    return res.status(200).json({ message: 'Logged out successfully' });
});

export const logout = async (req, res) => {
    try {
       
  res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'None'
        });
        // Respond with a success message
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        // Handle any errors that might occur
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getMe = async (req, res) => {
    try {
        // Retrieve the current user by their ID, excluding the password field
        const user = await User.findById(req.user._id).select("username -_id color");

        // Respond with the user data
        res.status(200).json({user});
    } catch (error) {
        // Handle any errors that might occur
        console.log("Error in getMe controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
