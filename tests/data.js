import mongoose from "mongoose";

export const courses = [
  {
    name: "RDBMS",
    author: {
      name: "Johnson",
    },
    price: 7284.0,
    category: "web",
    isPublished: true,
    tags: ["New"],
  },
  {
    _id: new mongoose.Types.ObjectId("6a0875e83cc3e2826d3b734b"),
    name: "AI with DB",
    author: {
      name: "Charan",
    },
    price: 8383.0,
    category: "web",
    isPublished: true,
    tags: ["New"],
  },
];
