import EventEmitter from "events";

class Logger extends EventEmitter {
  log(message = "") {
    // Here we can do API call for saving log in DB or so..
    console.log(`Message: ${message}`);

    // In this all EventEmitter properties and functions will be available because of extenstion to Logger class
    //   Raising event
    this.emit("messageLogged");
  }
}

export default Logger;
