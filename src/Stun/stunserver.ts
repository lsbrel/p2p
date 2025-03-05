//@ts-expect-error
const stun = require("stun");

const PORT = 8081;

const server = stun.createServer({
  type: "udp4",
});

server.listen(PORT, () => {
  console.log(`Stun server is running on port ${PORT}`);
});

server.on("bindingRequest", (msg: any, info: any) => {
  console.log(
    `Received stun binding request from ${info.address}:${info.port}`
  );
  server.send(
    stun.createMessage(stun.constants.STUN_BINDING_RESPONSE),
    info.port,
    info.address
  );
});
