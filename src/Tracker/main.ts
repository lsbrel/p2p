import net from "net";

var clients = new Map<string, string>();

const server = net.createServer((socket: net.Socket) => {
  const sock = clients.get("seeder");

  socket.write(`${sock}\r\n`);

  socket.on("data", (data) => {});

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (err) => {
    console.error(`Socket error: ${err.message}`);
  });
});

server.on("connection", (socket: net.Socket) => {
  if (!clients.has("seeder"))
    clients.set(
      "seeder",
      JSON.stringify({
        host: socket.remoteAddress,
        port: socket.remotePort,
      })
    );

  console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);
});

server.listen(8081, "0.0.0.0", () => {
  console.log(`Server is running on port ${"127.0.0.1"}:${8081}`);
});
