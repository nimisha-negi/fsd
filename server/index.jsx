const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mailApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("Connected to MongoDB");

// SCHEMAS
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const MailSchema = new mongoose.Schema({
  userEmail: String,
  subject: String,
  content: String,
});

const User = mongoose.model("User", UserSchema);
const Mail = mongoose.model("Mail", MailSchema);

// Create sample user and mails once
User.findOne({ email: "nimisha@gmail.com" }).then((user) => {
  if (!user) {
    User.create({ email: "nimisha@gmail.com", password: "123456" });
    Mail.create([
      {
        userEmail: "nimisha@gmail.com",
        subject: "Welcome!",
        content: "Thanks for signing up.",
      },
      {
        userEmail: "nimisha@gmail.com",
        subject: "Assignment",
        content: "Your MERN assignment is due tomorrow.",
      },
    ]);
    console.log("Sample user and mails created.");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true, email });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET MAILS
app.post("/get-mails", async (req, res) => {
  const { email } = req.body;
  try {
    const mails = await Mail.find({ userEmail: email });
    res.json({ mails });
  } catch (err) {
    res.status(500).json({ success: false, message: "Mail fetch failed" });
  }
});

// ADD NEW MAIL
app.post("/add-mail", async (req, res) => {
  const { userEmail, subject, content } = req.body;

  try {
    const newMail = await Mail.create({ userEmail, subject, content });
    res.json({ success: true, message: "Mail added", mail: newMail });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding mail", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
