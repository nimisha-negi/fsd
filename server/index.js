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
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// SCHEMAS
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
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
User.findOne({ email: "nimisha@gmail.com" }).then(async (user) => {
  if (!user) {
    await User.create({ fullName: "Nimisha", email: "nimisha@gmail.com", phone: "1234567890", password: "123456" });
    await Mail.insertMany([
      {
        userEmail: "nimisha@gmail.com",
        subject: "Welcome!",
        content: "Thanks for signing up.",
      },
      {
        userEmail: "nimisha@gmail.com",
        subject: "JIMS",
        content: "ASSIGN 1:Your MERN assignment is due tomorrow.",
      },
      {
        userEmail: "nimisha@gmail.com",
        subject: "JIMS",
        content: "ASSIGN 2:Your PYTHON assignment is due today.",
      },
      {
        userEmail: "nimisha@gmail.com",
        subject: "Team Unstop",
        content: "Reminder: GOI’s IREL- registrations are closing!",
      },
      {
        userEmail: "nimisha@gmail.com",
        subject: "OLA",
        content: "Last Chance Nimisha Negi! Complete Your Loan Application",
      },
      {
        userEmail: "nimisha@gmail.com",
        subject: "Elearnmarkets",
        content: "26% Reciprocal Tariff On Tariff- Now What?",
      },
      {
        userEmail: "nimisha@gmail.com",
        subject: "JIMS",
        content: "REMINDER: Last Chance Nimisha Negi! Complete Your Application",
      },
    ]);
    console.log("Sample user and mails created.");
  }
});

app.get("/", (req, res) => {
  res.send("Server is running.");
});

// SIGNUP
app.post("/signup", async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already exists." });
    }

    const newUser = new User({ fullName, email, phone, password });
    await newUser.save();

    res.json({ success: true, message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error during signup." });
  }
});

//LOGIN
app.get("/login", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true, message:"Login Successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET MAILS
app.get("/get-mails", async (req, res) => {
  const { email } = req.query;
  try {
    const mails = await Mail.find({ userEmail: email });
    res.json(mails);
  } catch (err) {
    res.status(500).json({ message: "Error fetching mails", error: err });
  }
});

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
