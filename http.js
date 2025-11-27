import { log } from "console";
import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("I'm from HTTP Server");
    res.end();
  }

  if (req.url === "/users") {
    res.write(JSON.stringify([1, 2, 3, 4, 5, 6, 7]));
    res.end()
  }
});

const PORT = 3000

server.listen(PORT, () =>{
    log(`listening on ${PORT}`)
})

server.on('close', () =>{
    log("Server closed bye bye!!!")
})
