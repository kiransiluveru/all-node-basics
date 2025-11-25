
import './global_obj.js'
import log_module from './log_module.js'
import path_module from './path_module.js'

const sayHello = (name) =>{
    console.log(`Hello ${name}, Have a great Day`)
}

sayHello("Kiran")

console.log(`index.js >>>>>> global this greet`,globalThis.greet) 


// console.log(import);
console.log(import.meta);

log_module.log("I am from log module imported func")
