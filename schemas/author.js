import mongoose, { Schema } from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: Schema.Types.String },
});

export const Author = mongoose.model("Author", authorSchema);