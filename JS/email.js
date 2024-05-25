require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Email Schema
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Email = mongoose.model("Email", emailSchema);

// Handle form submission
app.post("/submit-email", async (req, res) => {
  const email = req.body.email;

  // Simple email validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email format");
  }

  // Store email in database
  try {
    const newEmail = new Email({ email });
    await newEmail.save();
    res.send("Email successfully added to the database");
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("Email already exists");
    } else {
      res.status(500).send("Internal server error");
    }
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
