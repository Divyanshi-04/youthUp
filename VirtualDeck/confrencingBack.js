const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3000 });

let rooms = {}; // Store connected clients in rooms

server.on("connection", (socket) => {
  socket.on("message", (message) => {
    let data = JSON.parse(message);

    switch (data.type) {
      case "join-room":
        if (!rooms[data.room]) rooms[data.room] = [];
        rooms[data.room].push(socket);
        console.log(`User joined room: ${data.room}`);

        rooms[data.room].forEach((client) => {
          if (client !== socket)
            client.send(JSON.stringify({ type: "new-peer" }));
        });
        break;

      case "signal":
        rooms[data.room].forEach((client) => {
          if (client !== socket)
            client.send(
              JSON.stringify({ type: "signal", signal: data.signal })
            );
        });
        break;
    }
  });

  socket.on("close", () => {
    for (let room in rooms) {
      rooms[room] = rooms[room].filter((client) => client !== socket);
    }
  });
});

console.log("WebRTC Signaling Server running on ws://localhost:3000");
