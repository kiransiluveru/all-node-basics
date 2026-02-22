import mongoose, { Schema } from "mongoose";

export const authorSchema = new mongoose.Schema({
  name: { type: Schema.Types.String , required: true},
});

export const Author = mongoose.model("Author", authorSchema);