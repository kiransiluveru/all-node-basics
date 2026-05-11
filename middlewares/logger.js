import logger from "../utils/logger.js";

const reqLogger = (req, _res, next) => {
  logger.info("Req Logger middleware", { method: req.method, url: req.url });
  next();
};

export default reqLogger