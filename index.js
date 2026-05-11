import express from "express";
import debug from "debug";

import routes from "./startup/routes.js";
import logger from "./utils/logger.js";
import "./utils/db.js";

const app = express();

const startUpDebugger = debug("app:startup");

routes(app);

logger.info("Winston logging initialized");
const PORT = 3000;
app.listen(PORT, () => {
  startUpDebugger(`listening on ${PORT}`);
  logger.info(`Server listening on port ${PORT}`);
});
