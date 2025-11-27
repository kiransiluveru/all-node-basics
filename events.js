import EventEmitter from "events";
import Logger from "./logger.js";
const eventEmitter = new EventEmitter();

const triggerer = () => {
  console.log("triggered an event");
};

eventEmitter.on("trigger", triggerer);

eventEmitter.emit("trigger");
eventEmitter.emit("trigger");

eventEmitter.off("trigger", triggerer);

eventEmitter.emit("trigger");

const app_logger = new EventEmitter();

app_logger.on("message", (message = "") => {
  console.log(`Message received: ${message}`);
});

app_logger.emit("message");

console.log()

const logger = new Logger();
logger.on("messageLogged", () => {
  console.log("messageLogged event triggered");
});

logger.log("Hey I'm from logger");
