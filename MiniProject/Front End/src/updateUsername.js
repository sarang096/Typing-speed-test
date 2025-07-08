const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Typify'); // Adjust the path as needed

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/typify", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log("MongoDB connection error:", err));

// Update username endpoint
app.put('/updateUsername', async (req, res) => {
    const { email, newUserName } = req.body;
    try {
        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { name: newUserName },
            { new: true }
        );

        if (user) {
            res.status(200).json({ message: "Username updated successfully", user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error("Error updating username:", err);
        res.status(500).json({ message: "An error occurred while updating the username. Please try again." });
    }
});

// Server listening
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
