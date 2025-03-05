// import net from "net";

// const client = new net.Socket();
// const server = net
//   .createServer((socket) => {
//     socket.on("data", (data) => {
//       console.log(data.toString());
//     });
//   })
//   .listen(8082, "0.0.0.0");
// server.on("connection", () => {
//   console.log("isConnected");
// });

// client.connect(8081, "52.91.205.97", () => {
//   console.log("Conected to server");
//   client.write("seeder");
// });

// client.on("data", (data) => {
//   console.log(data.toString());
// });

// client.on("close", () => {
//   console.log("Client server discopnected");
// });

const natpmp = require("nat-pmp");

// Create a client to interact with the NAT-PMP router
async function t() {
  console.log("Attempt to connect on router");
  var client = await natpmp.connect("192.168.3.1");

  client.externalIp((err: any, info: any) => {
    console.log("Attempt to get external ip");
    if (err) throw err;
    console.log("Current external IP address: %s", info.ip.join("."));
  });

  client.portMapping(
    { private: 8082, public: 8082, ttl: 3600 },
    (err: any, info: any) => {
      if (err) throw err;
      console.log(info);
    }
  );
}

t();
