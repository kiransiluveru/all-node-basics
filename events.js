import EventEmitter from "events";
const eventEmitter = new EventEmitter();

const triggerer = () => {
  console.log("triggered an event");
};

eventEmitter.on("trigger", triggerer);

eventEmitter.emit("trigger");
eventEmitter.emit("trigger");

eventEmitter.off("trigger", triggerer);

eventEmitter.emit("trigger");
