
import './global_obj.js'

const sayHello = (name) =>{
    console.log(`Hello ${name}, Have a great Day`)
}

sayHello("Kiran")

console.log(`index.js >>>>>> global this greet`,globalThis.greet) 