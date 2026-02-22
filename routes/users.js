import { Router } from "express";
import Joi from "joi";
import User from "../schemas/user.js";
import mongoose from "mongoose";
import { userInfoValidateSchema } from "../utils/validators.js";

const router = Router();

router.get("/", async (req, res) => {
  console.log("mongoose.modelnames", mongoose.modelNames());
  const usersResponse = await User.find({});
  res.send(usersResponse);
});

const paramsSchema = Joi.object({ id: Joi.string().length(24).hex().required() });

// get the user by id
router.get("/:id", async (req, res) => {
  const { params } = req;
  const { error } = paramsSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found with given ID" });
    }
    res.json({ user, message: "Fetched user details successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const newUser = { ...req.body };
  const { error, value, warning } = userInfoValidateSchema.validate(newUser);
  if (error) {
    res.status(400).send({ message: "Invalid request", error: error.details[0].message });
  }
  const userObj = new User({ ...value });
  try {
    const saveResponse = await userObj.save();
    res.status(201).send({ data: saveResponse, message: "User Created Successfully" });
  } catch (e) {
    console.log("e", e);
    if (e.code === 11000) {
      res.status(400).send("User with this email already exists.");
    }
    res.status(400).send(e.message);
  }
});

// Update
router.put("/:id", async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send("User with given id not found, try with other id");
  }
  try {
    user.set(req.body);
    const saved = await user.save();
    res.status(200).send({ data: saved, message: "User updated successfully" });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "User with given id not found" });
  }

  try {
    const deleteDocument = await User.findByIdAndDelete(id);
    if (deleteDocument) {
      res.send({ user: deleteDocument, message: "Deleted successfully" });
      return;
    }
    res.status(404).send({ message: "User with given id not found" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
