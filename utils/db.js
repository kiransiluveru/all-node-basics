import mongoose, { SchemaTypes } from "mongoose";

const DB_URL = "localhost:27017";
const DB_CONNECTION_URL = `mongodb://${DB_URL}/gaininsight`;

const makeConnection = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_URL);
    console.log("Mongoose connection is successful");
  } catch (e) {
    console.log("Error while Connecting to DB", e);
  }
};

makeConnection();

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: { type: Number, default: 0 },
  isPublished: Boolean,
  tags: [String],
  date: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const courseObj = new Course({
    name: "Javascript",
    author: "SKK",
    isPublished: false,
    tags: ["frontend", "intermediate"],
    price: 1200,
    description: "Some desc of course",
  });
  const saveResponse = await courseObj.save();
  console.log("saveResponse >>> ", saveResponse, saveResponse._id);
};

const getCourses = async () => {
  // .find({ price :{ $gte : 100}, isPublished: false })
  // .find({ price :{ $in : [1000, 500, 1200]}})
  // { $or: [ { price: { $gte :500 }}, { isPublished: false}]}
  // { $or: [ { price: { $gte :500 }}, { isPublished: false}]}
  // find({ author: /.*ramesh.*/i })

  //   { tags: {$in: ["backend"]}} ==== { tags: "backend" }
  // {isPublished: true, $or: [ {tags: "frontend"}, {tags: "backend"} ] }

  const pageNumber = 1;
  const pageSize = 15;
  const coursesResponse = await Course.find({ price: { $gte: 0 }, name: /.*ker.*/i });

  // .skip((pageNumber - 1) * pageSize)
  // .limit(pageSize);
  // .sort({ name: "desc" });
  console.log("coursesResponse >>> ", coursesResponse, coursesResponse?.length);
};

// getCourses();

// createCourse();

// {
//   filter: {
//     isPublished: true,
//     tags: {
//       $in: [
//         'frontend',
//         'backend'
//       ]
//     }
//   },
//   sort: {
//     price: -1
//   },
//   project: {
//     name: 1,
//     author: 1,
//     price: 1
//   }
// }
