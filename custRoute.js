const express = require("express");
const User = require('../models/userModel');
const Adm = require('../models/adminModel');
const Query = require("../models/queryschema"); // Ensure this path is correct


const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({});
        return res.json(allUsers);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving users", error });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const foundUser = await User.findById(id);
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(foundUser);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving user", error });
    }
});

// Update user
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: "Error updating user", error });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(deletedUser);
    } catch (error) {
        return res.status(500).json({ message: "Error deleting user", error });
    }
});

// Create user
router.post("/", async (req, res) => {
    try {
        const { firstname, lastname, email, Password, username } = req.body;
        const newUser = await User.create({
            firstname,
            lastname,
            username,
            email,
            Password
        });
        return res.status(201).json({ msg: "User created successfully", newUser });
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error });
    }
});

// User login
router.post("/cust", async (req, res) => {
    try {
        const { username, Password } = req.body;
        const foundUser = await User.findOne({ username });
        if (!foundUser) {
            return res.status(401).json({ message: "Invalid Username" });
        }
        if (foundUser.Password !== Password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        return res.json({ message: "Login Success" });
    } catch (error) {
        return res.status(500).json({ message: "Error during login", error });
    }
});

// Admin login
router.post("/admin", async (req, res) => {
    try {
        const { username, Password } = req.body;
        const foundAdmin = await Adm.findOne({ username });
        if (!foundAdmin) {
            return res.status(401).json({ message: "Invalid Username" });
        }
        if (foundAdmin.Password !== Password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        return res.json({ message: "Login Success" });
    } catch (error) {
        return res.status(500).json({ message: "Error during admin login", error });
    }
});

// Add query
router.post("/addquery", async (req, res) => {
    try {
        const { department, subject, query, id } = req.body;
        const newQuery = await Query.create({
            department,
            subject,
            query,
            uid: id,
            status: 'p'
        });
        return res.status(201).json({ msg: "Query added successfully", newQuery });
    } catch (error) {
        return res.status(500).json({ message: "Error adding query", error });
    }
});

module.exports = router;
