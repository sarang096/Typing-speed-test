const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Typify');
const TypingTestModel = require('./models/TypingTest');
const FeedbackModel = require('./models/Feedback');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/typify", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log("MongoDB connection error:", err));

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({ message: "Success", userId: user._id, userName: user.name }); // Return userId and userName on successful login
                } else {
                    res.status(401).json({ message: "Password is incorrect. Please try again." });
                }
            } else {
                res.status(404).json({ message: "No record existed" });
            }
        })
        .catch(err => {
            console.error("Error during login:", err);
            res.status(500).json({ message: "An error occurred during login. Please try again." });
        });
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { email, name, password } = req.body;

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                console.log("User already exists with email:", email);
                return res.status(409).json({ message: "Email already exists. Please use a different email." });
            } else {
                UserModel.create({ email, name, password })
                    .then(newUser => {
                        res.status(201).json({ message: "User created successfully!", user: newUser });
                    })
                    .catch(err => {
                        console.error("Error creating user:", err);
                        res.status(500).json({ message: "Error creating user. Please try again." });
                    });
            }
        })
        .catch(err => {
            console.error("Error checking user existence:", err);
            res.status(500).json({ message: "An error occurred. Please try again." });
        });
});

// Fetch all users
app.get('/users', (req, res) => {
    UserModel.find({})
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error("Error fetching users:", err);
            res.status(500).json({ message: "An error occurred while fetching users. Please try again." });
        });
});

// Fetch user by email 
app.post('/users/email', (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => {
            console.error("Error fetching user:", err);
            res.status(500).json({ message: "An error occurred while fetching the user. Please try again." });
        });
});

// Save typing test result

app.put('/saveTest', async (req, res) => {
    const { userId, userName, text, wordsPerMinute, accuracy, date } = req.body;

    try {
        // Check if a test for this user and text already exists
        const existingTest = await TypingTestModel.findOne({ userId, text });

        if (existingTest) {
            // Update the existing test
            existingTest.wordsPerMinute = wordsPerMinute;
            existingTest.accuracy = accuracy;
            existingTest.date = date;

            await existingTest.save();
            res.status(200).json({ message: "Typing test result updated successfully!", test: existingTest });
        } else {
            // Create a new test record
            const newTest = await TypingTestModel.create({ userId, userName, text, wordsPerMinute, accuracy, date });
            res.status(201).json({ message: "Typing test result saved successfully!", test: newTest });
        }
    } catch (err) {
        console.error("Error saving or updating typing test result:", err);
        res.status(500).json({ message: "An error occurred while saving the test result. Please try again." });
    }
});


// Fetch typing test results with user details
app.get('/typingTests', (req, res) => {
    TypingTestModel.find({})
        .populate('userId', 'name email') 
        .then(typingTests => {
            res.status(200).json(typingTests);
        })
        .catch(err => {
            console.error("Error fetching typing tests:", err);
            res.status(500).json({ message: "An error occurred while fetching typing tests. Please try again." });
        });
});

// Fetch top 10 typing test results
app.get('/profile', async (req, res) => {
    try {
        const topResults = await TypingTestModel.find()
            .sort({ wordsPerMinute: -1 })
            .limit(10)
            .select('userName wordsPerMinute accuracy')
            .lean();

        res.json({ topResults });
    } catch (err) {
        console.error("Error fetching top results:", err);
        res.status(500).json({ message: "An error occurred while fetching top results. Please try again." });
    }
});

// Fetch profiles with average WPM and accuracy
app.get('/profiles', async (req, res) => {
    try {
        const profileData = await TypingTestModel.aggregate([
            {
                $group: {
                    _id: "$userId",
                    userName: { $first: "$userName" },
                    averageWPM: { $avg: "$wordsPerMinute" },
                    averageAccuracy: { $avg: "$accuracy" }
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    userName: 1,
                    averageWPM: 1,
                    averageAccuracy: 1
                }
            }
        ]);

        res.status(200).json(profileData);
    } catch (err) {
        console.error("Error fetching profile data:", err);
        res.status(500).json({ message: "An error occurred while fetching profile data. Please try again." });
    }
});

// Feedback submission endpoint
app.post('/feedback', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newFeedback = await FeedbackModel.create({ name, email, message });
        res.status(201).json({ message: "Feedback submitted successfully!", feedback: newFeedback });
    } catch (err) {
        console.error("Error submitting feedback:", err);
        res.status(500).json({ message: "An error occurred while submitting feedback. Please try again." });
    }
});

app.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await FeedbackModel.find().sort({ date: -1 });
        res.status(200).json(feedbacks);
    } catch (err) {
        console.error("Error fetching feedback:", err);
        res.status(500).json({ message: "An error occurred while fetching feedback. Please try again." });
    }
});

// Fetch all typing test results
app.get('/typingTests', async (req, res) => {
    try {
        const typingTests = await TypingTestModel.find({}).lean();
        res.status(200).json(typingTests);
    } catch (err) {
        console.error("Error fetching typing test results:", err);
        res.status(500).json({ message: "An error occurred while fetching typing test results. Please try again." });
    }
});


// Update password endpoint
app.put('/updatePassword', async (req, res) => {
    const { email, newPassword } = req.body;
    console.log("Received request to update password for email:", email); // Log incoming data
    try {
        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { password: newPassword },
            { new: true }
        );
        if (user) {
            console.log("Password updated successfully for user:", user); // Log success
            res.status(200).json({ message: "Password updated successfully", user });
        } else {
            console.log("User not found with email:", email); // Log user not found
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error("Error updating password:", err);
        res.status(500).json({ message: "An error occurred while updating the password. Please try again." });
    }
});

app.put('/updateHistoryDate', async (req, res) => {
    const { id, newDate } = req.body;
    try {
        const updatedEntry = await TypingTestModel.findByIdAndUpdate(
            id,
            { date: new Date(newDate) },
            { new: true }
        );
        if (updatedEntry) {
            res.status(200).json({ message: "Date updated successfully", entry: updatedEntry });
        } else {
            res.status(404).json({ message: "Entry not found" });
        }
    } catch (err) {
        console.error("Error updating date:", err);
        res.status(500).json({ message: "An error occurred while updating the date. Please try again." });
    }
});


// Server listening
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
