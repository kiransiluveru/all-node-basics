import express from "express";
import debug from "debug";
import config from "config";
import routes from "./startup/routes.js";
import logger from "./utils/logger.js";
import "./utils/db.js";

const app = express();

const startUpDebugger = debug("app:startup");
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
routes(app);

logger.info("Winston logging initialized");
const PORT = 3000;
const server = app.listen(PORT, () => {
  startUpDebugger(`listening on ${PORT}`);
  logger.info(`Server listening on port ${PORT}`);
});

export default server;
