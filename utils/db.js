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
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const courseObj = new Course({
    name: "Ruby",
    author: "Naveen",
    // isPublished: true,
    tags: [],
    price: 8352,
    category: "+++",
    description: "Java with UI and Backend modules course",
  });
  try {
    const saveResponse = await courseObj.save();
    console.log("saved successfully >>> ", saveResponse, saveResponse._id);
  } catch (e) {
    console.log("error while saving", e.errors);
    for (let key in e.errors) {
      console.log("key => ", key, "=>", e.errors[key]?.properties.message);
    }
  }
};

// const getCourses = async () => {
//   // .find({ price :{ $gte : 100}, isPublished: false })
//   // .find({ price :{ $in : [1000, 500, 1200]}})
//   // { $or: [ { price: { $gte :500 }}, { isPublished: false}]}
//   // { $or: [ { price: { $gte :500 }}, { isPublished: false}]}
//   // find({ author: /.*ramesh.*/i })

//   //   { tags: {$in: ["backend"]}} ==== { tags: "backend" }
//   // {isPublished: true, $or: [ {tags: "frontend"}, {tags: "backend"} ] }

//   const pageNumber = 1;
//   const pageSize = 15;
//   const coursesResponse = await Course.find({ price: { $gte: 0 }, name: /.*ker.*/i });

//   // .skip((pageNumber - 1) * pageSize)
//   // .limit(pageSize);
//   // .sort({ name: "desc" });
//   console.log("coursesResponse >>> ", coursesResponse, coursesResponse?.length);
// };

const updateWithQueryFirstDocument = async (id) => {
  const course = await Course.findById(id);
  if (!course) {
    console.log("Course not found with given id");
    return;
  }
  try {
    course.set({ price: 1679, author: "Vishnu Bhagavan", ramki: false });
    const saved = await course.save();
    console.log("saved successfully", saved);
  } catch (e) {
    console.error("failed to save", e);
  }
};

// const getCourseById = async (id) => {
//   const course = await Course.findById(id);
//   console.log("course", course);
// };

const updateBypdateFirst = async () => {
  const updateResponse = await Course.findByIdAndUpdate("69341f78a4e9b6518f63d6a6", { tags: "pre_requisites", price: 5384, author: "Sri Chandu" });
  console.log("updateResponse", updateResponse);
};

const deleteDocument = async (_id) => {
  //   const deleteDocument = await Course.findByIdAndDelete("69341f78a4e9b6518f63d6a6");
  const deleteDocument = await Course.deleteOne({ _id: _id });
  console.log("deleteDocument", deleteDocument);
};

// deleteDocument("69341e27ea7ed348a9712e35");

// updateBypdateFirst();
// getCourseById('69341d1841b470b489adc21d')
// updateWithQueryFirstDocument("69341d1841b470b489adc21d");
// getCourses();
// createCourse();
export default { Course: Course };
