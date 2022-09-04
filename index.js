const express = require("express");
const app = express();

const http = require("http").createServer(app);
const Port = process.env.port || 3000;

http.listen(Port, () => {
  console.log("server started" + Port);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// =======soket

const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("soket connected...");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
