import mongoose from "mongoose";
import logger from "./logger.js";
import config from "config";
let dbUrl = "";

if (!config.get("db_url")) {
  throw new Error("No DB URL provided");
}
const DB_CONNECTION_URL = config.get("db_url");
console.log("DB_CONNECTION_URL", DB_CONNECTION_URL);
const makeConnection = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_URL);
    logger.info("Mongoose connection is successful");
  } catch (e) {
    logger.error("Error while Connecting to DB", e);
    throw e;
  }
};

await makeConnection();

const gainInsightDb = mongoose.connection.db;

if (gainInsightDb) {
  try {
    await gainInsightDb.collection("users").createIndex({ email: 1 }, { unique: true });
  } catch (e) {
    logger.error("Error creating index", e);
  }
}
