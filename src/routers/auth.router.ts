import express from "express";
import { emailRegex } from "../middleware/types";
import { User } from "../db/schemas/userSchema.schema";
import jwt from "jsonwebtoken"

const authRouter = express.Router();


authRouter.post("/register", async (req, res) => {
    const data = req.body;
    // * Make sure request has the email
    if (!data.email) {
      return res.status(400).json({ error: { register: "Email not recieved" } });
    }
    const existingUser = await User.findOne({ email: data.email });
    // * If the user is found, return an error because there is already a user registered
    if (existingUser) {
      return res
        .status(400)
        .json({ error: { email: "Email already registered" } });
    } else {
      if (!data.email.match(emailRegex)) {
        return res.status(400).json({ error: { email: "Insert a valid email" } });
      }
      const newUser = new User({
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        pronouns: data.pronouns,
        teamrole: data.teamrole,
        birthday: data.birthday,
        profilepic: data.profilepic,
      });
      const savedUser = await newUser.save();
      if (savedUser) {
        return res.status(201).json({
          token: savedUser.generateJWT(),
          user: {
            email: savedUser.email,
            firstname: savedUser.firstname,
            lastname: savedUser.lastname,
            pronouns: savedUser.pronouns,
            teamrole: savedUser.teamrole,
            birthday: savedUser.birthday,
            id: savedUser._id,
            profilepic: data.profilepic,
          },
        });
      } else {
        return res
          .status(500)
          .json({ error: { firstName: "Error creating new User :(", err } });
      }
    }
  });