import { Router } from "express";
import mongoose from "mongoose";
import Joi from "joi";
import bcrypt from "bcrypt";
import _ from "lodash";

import User, { validateLogin, validateUser } from "../schemas/user.js";
import { userInfoValidateSchema } from "../utils/validators.js";

const router = Router();

router.post("/register", async (req, res) => {
  const newUser = { ...req.body };
  const { error, value: validatedUser } = validateUser(newUser);
  if (error) {
    return res.status(400).send({ message: "Invalid request", error: error.details[0].message });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(validatedUser.password, salt);
    validatedUser.password = hash;
    const userObj = new User({ ...validatedUser });
    const saveResponse = await userObj.save();
    const userData = { ..._.pick(saveResponse, ["name", "email", "_id"]), role: "Admin" };
    const token = userObj.generateJwtToken();
    return res.header("x-access-token", token).status(201).send({ token: token, message: "User registered successfully" });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).send("User with this email already exists.");
    }
    return res.status(400).send(e.message);
  }
});

router.post("/", async (req, res) => {
  const credentials = { ...req.body };
  const { error, value: validatedUser } = validateLogin(credentials);
  console.log("validation failed", error);
  if (error) {
    return res.status(401).send({ message: "Invalid email or password" });
  }
  console.log("credentials", credentials);

  try {
    const findResp = await User.findOne({ email: credentials.email });
    console.log("findResp", findResp);
    if (!findResp) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const match = await bcrypt.compare(credentials.password, findResp.password);
    console.log("match", match);
    if (!match) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const token = findResp.generateJwtToken();
    return res.header("x-access-token", token).status(200).send({ token, message: "Authentication successful" });
  } catch (e) {
    console.log("e", e);
    return res.status(401).send({ message: "Invalid email or password" });
  }
});

export default router;
