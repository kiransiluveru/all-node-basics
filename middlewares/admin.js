import Router from "express";
import logger from "../utils/logger.js";

const hasAdminAccess = (req, res, next) => {
  if (!req.user.isAdmin) {
    logger.error("Access forbidden for this request!");
    return res.status(403).send({ message: "Access Forbidden" });
  }
  next();
};

export default hasAdminAccess;
