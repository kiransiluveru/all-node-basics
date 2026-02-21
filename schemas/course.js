import mongoose from "mongoose";


const course = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    author: String,
    price: {
      type: Number,
      default: 0,
      max: 100000,
      required: function () {
        return this.isPublished;
      },
    },
    category: { type: String, enum: ["web", "mobile", "network", "soft_skills", "spiritual"] },
    isPublished: { type: Boolean, required: true },
    tags: {
      type: Array,
      validate: {
        validator: async function (value) {
          // we will perform some async operation and check for validation here
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 3000)
          );
          const validationResult = value && value.length > 0;
          return validationResult;
        },
        message: "Atleast one tag is required",
      },
    },
    date: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: (_doc, returnedObject, _options) => {
        delete returnedObject.__v;
        return returnedObject;
      },
    },
  }
);

const Course = mongoose.model("Course", course);

export default Course;
