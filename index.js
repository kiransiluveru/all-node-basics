import express from "express";
import Joi from "joi";
import authLogger from "./middlewares/authentication.js";
import reqLogger from "./middlewares/logger.js";
import morgan from "morgan";
import helmet from "helmet";
import config from "config";
import debug from "debug";
const startUpDebugger = debug("app:startup");
const dbDebugger = debug("app:db");
import courseRouter from "./routes/courses.js";
import userRouter from "./routes/users.js";

import "./utils/db.js";

const app = express();

/* Static Middlewares */
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
// static folder files hosting
app.use(express.static("public"));
app.use(helmet());
// custom middlewares
app.use(reqLogger);
app.use(authLogger);

const PORT = 3000;

startUpDebugger("app.getenv ", app.get("env")); //development by default
startUpDebugger("app.API_URL ", app.get("API_URL"));
startUpDebugger("process.env.NODE_ENV", process.env.NODE_ENV);

startUpDebugger("App Name", config.get("name"));
startUpDebugger("mail-server", config.get("mail.host"));
startUpDebugger("mail-server", config.get("mail.password"));

dbDebugger("Connection Established ...........");

const developmentEnv = app.get("env") === "development";
if (developmentEnv) {
  app.use(morgan("combined"));
}

// 400 bad request
// 404 resource not found
// 200 success
// 201 resource created successfully
// 504 gateway timeout
// 500 internal server error
// 401 unauthorized

app.use("/api/courses", courseRouter);
app.use("/api/users", userRouter)
console.log("ABD")
app.listen(PORT, () => {
  startUpDebugger(`listening on ${PORT}`);
});
