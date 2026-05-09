import { Router } from "express";
import Joi from "joi";
import User, { validateUser } from "../schemas/user.js";
import mongoose from "mongoose";
import { userInfoValidateSchema } from "../utils/validators.js";
import bcrypt from "bcrypt";
import _ from "lodash";
import config from "config";
import jsonwebtoken from "jsonwebtoken";

const router = Router();

router.get("/", async (req, res) => {
  const usersResponse = await User.find({});
  res.send(usersResponse);
});

router.get("/me", async (req, res) => {
  const profileId = req.user?._id;
  try {
    const profileInfo = await User.findById(profileId);
    const afterOmit = _.omit(profileInfo.toObject(), ["password"]);
    res.status(200).send({ ...afterOmit });
  } catch (error) {
    return res.status(400).send({ message: "Failed to get profile info" });
  }
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
    const afterOmit = _.omit(user.toObject(), ["password"]);
    return res.status(200).json({ user: afterOmit, message: "Fetched user details successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
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
      res.send({ user: _.pick(deleteDocument.toObject(), ["_id", "email"]), message: "Deleted successfully" });
      return;
    }
    res.status(404).send({ message: "User with given id not found" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
