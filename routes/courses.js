import { Router } from "express";
import Joi from "joi";
const router = Router()

const courses = [
  { id: 1, name: "React" },
  { id: 2, name: "Angular" },
  { id: 3, name: "NodeJS" },
  { id: 4, name: "Devops" },
];

const courseObjValidationSchema = Joi.object().keys({ name: Joi.string().required().min(3), id: Joi.number().optional() });

// list of courses
router.get("/", (req, res) => {
  const { params, path, query } = req;
  console.log("params", params, path, query);
  res.send(courses);
});

// get the course by id
router.get("/:id", (req, res) => {
  const { params, query } = req;
  console.log("params", params, query);
  const course = courses.find((courseObj) => courseObj.id === parseInt(params.id));
  if (!course) {
    return res.status(404).send("Course with given ID not found!!!");
  }
  res.send({ course, message: "Fetched course details successfully" });
});

router.get("/:year/:month", (req, res) => {
  const { params, path, query } = req;
  console.log("params", params, path, query);
  res.send({ Year: params.year, Month: params.month, query: req.query });
});

// Create course
router.post("/", (req, res) => {
  const validationResult = courseObjValidationSchema.validate(req.body);
  console.log("validationResult", validationResult);
  if (validationResult.error) {
    res.status(404).send(validationResult.error.details[0].message);
    return;
  }
  const newCourse = {
    id: req.body?.id || courses.length + 1,
    name: req.body.name,
  };
  courses.push(newCourse);
  res.status(201).send({ message: "Course Created Successfully" });
});

// Update
router.put("/:id", (req, res) => {
  const { id: courseId } = req.params;
  console.log("courseId", courseId);
  // look up for course
  const match = courses.find((obj) => String(obj.id) === courseId);
  if (!match) {
    res.status(404).send("Course with given id not found, try with other id");
    return;
  }

  // if found validate
  const validationResult = courseObjValidationSchema.validate(req.body);
  // if validation error return that error 400 status code
  if (validationResult.error) {
    res.status(400).send(validationResult.error.details[0].message);
    return;
  }
  // else save and send 200 status code
  const matchedIndex = courses.findIndex((obj) => String(obj.id) === courseId);
  courses[matchedIndex] = { ...courses[matchedIndex], ...req.body };
  res.status(200).send({ data: req.body, message: "course updated successfully" });
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

export default router