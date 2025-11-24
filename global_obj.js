console.log("Hey How are you???");

const setIntervalId = setInterval(() => {
  console.log("A");
}, 2000);

const id = setTimeout(() => {
  clearTimeout(setIntervalId);
  console.log("cleared interval");
}, 6000);

var message = "ABCD";
globalThis.greet = "Hello ________";
console.log("global_objs file ", globalThis, "\n", globalThis.message, "\n", globalThis.greet);
