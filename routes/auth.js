import { Router } from "express";
import mongoose from "mongoose";
import Joi from "joi";
import bcrypt from "bcrypt";
import _ from "lodash";

import User, { validateLogin } from "../schemas/user.js";
import { userInfoValidateSchema } from "../utils/validators.js";

const router = Router();

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
    console.log("match", match)
    if (!match) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    return res.status(200).send({ message: "Authentication successful" });
  } catch (e) {
    console.log("e", e);
    return res.status(401).send({ message: "Invalid email or password" });
  }
});

export default router;
