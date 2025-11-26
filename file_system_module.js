import fs, { promises } from "fs";

const readDirPromise = () => {
  return new Promise((resolve, reject) => {
    fs.readdir("./", {}, (err, files) => {
      if (err) {
        console.log("Error occurred while reading directory");
        reject("Failed to readdir", err);
      }
      resolve(files);
    });
  });
};

async function readFs() {
  try {
    const readFile = await promises.readFile("./index.html", { encoding: "utf8" });
    console.log("readFile", readFile);
  } catch (e) {
    console.log("Error occurred while reading content from html", e);
  }

  //   , (err, data) => {
  //     if (err) {
  //       console.log("Error occurred while reading content from html");
  //       return;
  //     }
  //     console.log("data >>>", data);
  //   }
  readDirPromise()
    .then(
      (success) => console.log("success", success),
      (failed) => console.log("failed", failed)
    )
    .catch((error) => console.log("caught with an error", error));
}
readFs();
