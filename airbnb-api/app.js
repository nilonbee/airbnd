const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("./models/user");

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: `http://localhost:5173`,
  })
);

mongoose.connect(process.env.MONGO_URL);
const secret = bcrypt.genSaltSync(10);
const jwtSecret = "lwjedlwkedjwlekdjwlkejdweidug23287364298*&987";

app.get("/test", (req, res) => {
  res.json({ success: true, data: [{ testingdata: "testing data" }] });
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userDoc = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, secret),
    });
    res.status(200).json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });
  if (userDoc) {
    console.log("userDoc", userDoc);
    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (passOK) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, firstName: userDoc.firstName },
        jwtSecret,
        {},
        (err, token) => {
          console.log("token", token);
          if (err) throw err;
          return res.cookie("token", token).json({ userDoc });
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(400).json({ msg: "login failed" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
    res.json(token);
  }
});

app.listen(4000, () => {
  console.log("app is listening on port 4000");
});
