import express from "express";
import Joi from "joi";

const app = express();
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

const courses = [
  { id: 1, name: "React" },
  { id: 2, name: "Angular" },
  { id: 3, name: "NodeJS" },
  { id: 4, name: "Devops" },
];

app.get("/", (req, res) => {
  const { params, path, query } = req;
  console.log("params", params, path, query);
  res.send({ name: "Kiran" });
  res.end();
});

app.get("/api/courses", (req, res) => {
  const { params, path, query } = req;
  console.log("params", params, path, query);
  res.send(courses);
});

// 400 bad request
// 404 resource not found
// 200 success
// 201 resource created successfully

app.get("/api/courses/:id", (req, res) => {
  const { params, query } = req;
  console.log("params", params, query);
  const course = courses.find((courseObj) => courseObj.id === parseInt(params.id));
  if (!course) {
    return res.status(404).send("Course with given ID not found!!!");
  }
  res.send({ course, message: "Fetched course details successfully" });
});

app.get("/api/courses/:year/:month", (req, res) => {
  const { params, path, query } = req;
  console.log("params", params, path, query);
  res.send({ Year: params.year, Month: params.month, query: req.query });
});

const courseObjValidationSchema = Joi.object().keys({ name: Joi.string().required().min(3), id: Joi.number().optional() });
app.post("/api/courses", (req, res) => {
  console.log(courseObjValidationSchema);
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

app.put("/api/courses/:id", (req, res) => {
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

app.delete("/api/courses/:id", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
