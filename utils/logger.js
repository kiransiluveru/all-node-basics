import winston from "winston";
import "winston-mongodb";
import path from "path";
import { fileURLToPath } from "url";
import config from "config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, "../logs.log");

const mongoDbUri = config.get("db_url");
const isTestEnv = process.env.NODE_ENV === "test";
const collectionName = isTestEnv ? "test_logs" : "app_logs";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: logFilePath }),
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.MongoDB({
      level: "error",
      db: mongoDbUri,
      options: { useUnifiedTopology: true },
      collection: collectionName,
      tryReconnect: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

export default logger;
