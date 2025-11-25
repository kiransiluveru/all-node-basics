import path, { dirname } from "path";
import { fileURLToPath } from "url";

console.log(import.meta.dirname);
console.log(import.meta.filename);

const filePath = fileURLToPath(import.meta.url);
console.log("filePath", filePath);

const pathObjOfFile = path.parse(filePath);
const pathObjOfDir = path.parse(dirname(filePath));

console.log("pathObjOfFile >>>>> ", pathObjOfFile);
console.log("pathObjOfDir", pathObjOfDir);
console.log("pathObjOfDir", path.delimiter);
console.log("pathObjOfDir", process.env.PATH);
console.log("pathObjOfDir", process.env.PATH.split(path.delimiter));


export default {};
