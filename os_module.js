import os from 'os';

console.log(`Total Memory: ${os.totalmem()}`)
console.log(`System architecture: ${os.arch()}`)
console.log(`Free Memory: ${os.freemem()}`)

console.log(`Platform Information: ${os.platform()}`)
console.log(`User Info: `, os.userInfo())
console.log(`Host Name: ${os.hostname()}`)
console.log(`Home Directory: ${os.homedir()}`)

