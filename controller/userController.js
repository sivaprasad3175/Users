import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "../model/userModel.js";

// Secret key for JWT (store in environment variables in production)
const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure key

// Create (Register) user
export const create = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user data
        const newUser = new User({ ...req.body, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login and create JWT token
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token with 15 minutes expiry
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Fetch all users (protected route)
export const fetch = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        return res.status(200).json(users); // Return the list of users as JSON
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Middleware to authenticate JWT tokens
export const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
        req.userId = decoded.userId; // Store user ID for future use
        next(); // Move to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: 'Token expired or invalid' });
    }
};
