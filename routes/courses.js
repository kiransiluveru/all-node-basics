import { Router } from "express";
import Joi from "joi";
import Course from "../schemas/course.js";
const router = Router();

router.get("/", async (req, res) => {
  const coursesResponse = await Course.find({});
  res.send(coursesResponse);
});

const paramsSchema = Joi.object({ id: Joi.string().length(24).hex().required() });
// get the course by id
router.get("/:id", async (req, res) => {
  const { params } = req;
  const { error } = paramsSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: "Invalid course ID" });
  }
  try {
    const course = await Course.findById(params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found with given ID" });
    }
    res.json({ course, message: "Fetched course details successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const newCourse = { ...req.body };
  const courseObj = new Course({ ...newCourse });
  try {
    const saveResponse = await courseObj.save();
    res.status(201).send({ data: saveResponse, message: "Course Created Successfully" });
  } catch (e) {
    // console.log("error while saving", e.errors);
    res.status(400).send(e.message);
  }
});

// Update
router.put("/:id", async (req, res) => {
  const { id: courseId } = req.params;
  console.log("courseId", courseId, req.body);
  const course = await Course.findById(courseId);
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
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteDocument = await Course.findByIdAndDelete(id);
    if (deleteDocument) {
      res.send({ course: deleteDocument, message: "Deleted successfully" });
      return;
    }
    res.status(404).send({ message: "Course with given id not found" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

export default router;
