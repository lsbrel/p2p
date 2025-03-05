//@ts-expect-error
const stun = require("stun");

async function startClient() {
  const res = await stun.request("stun.l.google.com:19302");
  const host = res.getXorAddress();

  console.log("your ip", host.address, host.port);
}

startClient()