import net from "net";

var dados: any;
const client = new net.Socket();
const directConnect = new net.Socket();

client.connect(8081, "52.91.205.97", () => {
  console.log("Conected to server");
  client.write("leecher");
});

client.on("data", (data) => {
  dados = JSON.parse(data.toString());

  client.end();
});

client.on("close", () => {
  directConnect.connect(80, dados.host, () => {
    console.log("Attempt to connect on seeder");
    directConnect.write("Direct connection has been estabilished\r\n");
  });
  console.log("Client server discopnected");
});
