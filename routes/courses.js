import { Router } from "express";
import Joi from "joi";
import db from "../utils/db.js";
const router = Router();

const courses = [
  { id: 1, name: "React" },
  { id: 2, name: "Angular" },
  { id: 3, name: "NodeJS" },
  { id: 4, name: "Devops" },
];

// const courseObjValidationSchema = Joi.object().keys({ name: Joi.string().required().min(3), id: Joi.number().optional() });

// list of courses
router.get("/", async (req, res) => {
  const { params, path, query } = req;
  const coursesResponse = await db.Course.find({});
  res.send(coursesResponse);
});

// get the course by id
router.get("/:id", async (req, res) => {
  const { params } = req;
  const course = await db.Course.findById(params.id);
  if (!course) {
    return res.status(404).send("Course with given ID not found!!!");
  }
  res.send({ course, message: "Fetched course details successfully" });
});

// router.get("/:year/:month", (req, res) => {
//   const { params, path, query } = req;
//   console.log("params", params, path, query);
//   res.send({ Year: params.year, Month: params.month, query: req.query });
// });

// Create course
router.post("/", async (req, res) => {
  const newCourse = { ...req.body };
  const courseObj = new db.Course({ ...newCourse });
  try {
    const saveResponse = await courseObj.save();
    res.status(201).send({data: saveResponse, message: "Course Created Successfully" });
  } catch (e) {
    // console.log("error while saving", e.errors);
    res.status(400).send(e.message);
  }
});

// Update
router.put("/:id", async (req, res) => {
  const { id: courseId } = req.params;
  console.log("courseId", courseId, req.body);
  const course = await db.Course.findById(courseId);
  if (!course) {
    console.log("Course not found with given id");
    res.status(404).send("Course with given id not found, try with other id");
  }
  try {
    // const validationResult = courseObjValidationSchema.validate(req.body);
    // if (validationResult.error) {
    //   res.status(400).send(validationResult.error.details[0].message);
    //   return;
    // }
    course.set(req.body);
    const saved = await course.save();
    res.status(200).send({ data: req.body, message: "course updated successfully" });
  } catch (e) {
    res.status(500).send(e.message);
    console.error("failed to save", e);
  }
});

// Delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const matchedIndex = courses.findIndex((obj) => String(obj.id) === id);
  if (matchedIndex === -1) {
    res.status(404).send("course with given id not found to delete");
    return;
  }
  const courseDeleted = courses[matchedIndex];
  courses.splice(matchedIndex, 1);
  res.send({ course: courseDeleted, message: "Deleted successfully " });
});

export default router;
