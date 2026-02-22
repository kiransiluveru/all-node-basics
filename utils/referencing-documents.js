import mongoose, { Schema } from "mongoose";
import './db.js'
import Course from "../schemas/course.js";
import { Author } from "../schemas/author.js";



async function createAuthor() {
  const author = new Author({ name: "Kalavati"  });
  await author.save();
  console.log("Author created successfully")
}

async function createCourse() {
  const course = new Course({ isPublished: false , author: '699ab3d5c562cf9e3bb6e83a', name: "JS with JQuery", category: 'web', tags: ['SEQUENCE']  });
  await course.save();
  console.log("course creation successful !!");
}

const listCourses = async () => {
   try {
    const coursesList = await Course.find({},  ).populate('author');
    
    // const coursesList = await Course.find({}, "-__v").populate('author', "-__v");
    console.log("coursesList", coursesList)
   } catch (error) {
        console.log("failed to get courses", error)
   }
   
}



// createAuthor()
// createCourse()

await listCourses()
console.log("fetching completed")
