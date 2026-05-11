import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import config from "config";
import debug from "debug";

import withProtected from "../middlewares/withProtected.js";
import courseRouter from "../routes/courses.js";
import userRouter from "../routes/users.js";
import authRouter from "../routes/auth.js";
import logger from "../utils/logger.js";


const routes = (app) => {
    const startUpDebugger = debug("app:startup");
  /* Static Middlewares */
  // Parse JSON request bodies
  app.use(express.json());
  // Parse URL-encoded request bodies
  app.use(express.urlencoded({ extended: true }));
  // static folder files hosting
  app.use(express.static("public"));
  app.use(helmet());
  // custom middlewares
//   app.use(reqLogger);

  startUpDebugger("app.getenv ", app.get("env")); //development by default
  //   startUpDebugger("app.API_URL ", app.get("API_URL"));
  //   startUpDebugger("process.env.NODE_ENV", process.env.NODE_ENV);
  //   startUpDebugger("App Name", config.get("name"));
  //   startUpDebugger("mail-server", config.get("mail.host"));
  //   startUpDebugger("mail-server", config.get("mail.password"));
  //   startUpDebugger("mail-server", config.get("mail.password"));

  const jwt_key = config.has("jwt_secret_key") ? config.get("jwt_secret_key") : null;
  if (!jwt_key) {
    logger.error("FATAL ERROR NO JWT KEY PROVIDED");
  } else {
    startUpDebugger("jwtkey", jwt_key);
  }

  const developmentEnv = app.get("env") === "development";
  if (developmentEnv) {
    app.use(morgan("combined"));
  }
  app.use("/api/courses", withProtected, courseRouter);
  app.use("/api/users", withProtected, userRouter);
  app.use("/api/auth", authRouter);
};

export default routes;
