import mongoose from "mongoose";

const DB_URL = "localhost:27017";
const DB_CONNECTION_URL = `mongodb://${DB_URL}/gaininsight`;

const makeConnection = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_URL);
    console.log("Mongoose connection is successful");
  } catch (e) {
    console.log("Error while Connecting to DB", e);
  }
};

makeConnection();
