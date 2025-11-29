import express from "express";
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

app.post("/api/courses", (req, res) => {
  const { params, path, query, body } = req;
  console.log("params", body);
  const newCourse = {
    id: courses.length + 1,
    name: body.name,
  };

  courses.push(newCourse);
  res.status(201).send({ message: "Course Created Successfully" });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
