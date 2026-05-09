import express from "express";
import Joi from "joi";
import reqLogger from "./middlewares/logger.js";
import morgan from "morgan";
import helmet from "helmet";
import config from "config";
import debug from "debug";
const startUpDebugger = debug("app:startup");
const dbDebugger = debug("app:db");
import courseRouter from "./routes/courses.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import withProtected from "./middlewares/withProtected.js";

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

const PORT = 3000;

startUpDebugger("app.getenv ", app.get("env")); //development by default
startUpDebugger("app.API_URL ", app.get("API_URL"));
startUpDebugger("process.env.NODE_ENV", process.env.NODE_ENV);

startUpDebugger("App Name", config.get("name"));
startUpDebugger("mail-server", config.get("mail.host"));
startUpDebugger("mail-server", config.get("mail.password"));
startUpDebugger("mail-server", config.get("mail.password"));
console.log("jwt_secret_key", config.get("jwt_secret_key"));
const jwt_key = config.get("jwt_secret_key");
if (!jwt_key) {
  console.error("FATAL ERROR NO JWT KEY PROVIDED");
}
startUpDebugger("jwtkey", config.get("jwt_secret_key"));

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
// 403 forbidden

app.use("/api/courses", withProtected, courseRouter);
app.use("/api/users", withProtected, userRouter);
app.use("/api/auth", authRouter);

console.log("ABD");
app.listen(PORT, () => {
  startUpDebugger(`listening on ${PORT}`);
});
