import "./db.js";
import Course from "../schemas/course.js";
import { Author } from "../schemas/author.js";

async function createAuthor() {
  const author = new Author({ name: "Kalavati" });
  await author.save();
  console.log("Author created successfully");
}

async function createCourse() {
  const course = new Course({ author: [{ name: "John Patriach" }, {name: "Ramesh"}], isPublished: false, name: "JS with JQuery", category: "web", tags: ["SEQUENCE"] });
  await course.save();
  console.log("course creation successful !!");
}

const listCourses = async () => {
  try {
    const coursesList = await Course.find({}).populate("author");
    // const coursesList = await Course.find({}, "-__v").populate('author', "-__v");
    console.log("coursesList", coursesList);
  } catch (error) {
    console.log("failed to get courses", error);
  }
};

// createCourse();

async function updateDocumentById(id) {
  try {
    // const updated = await Course.updateOne({ _id: id }, { $set: { "author": [{name: "Hanuman"}, {name: "sample"}] } });
    const course = await Course.findById(id)
    const authors = course.author;
    authors.push({name: "kamalaesh"})
    const   save_result = await course.save()
    console.log("save_result", save_result);
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

await updateDocumentById('699ad455943716b7c0543e65');

async function unSetDocument(id) {
    try {
        const updated = await Course.updateOne({ _id: id }, { $unset: { author: "" } });
        console.log("unset result", updated);
    } catch (error) {
        console.error("Error unsetting document:", error);
    }
}

// await unSetDocument('699ac1f3b5dea1873db0b13b')

console.log("fetching completed");
