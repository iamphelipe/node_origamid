import type { Midleware } from "../router.ts";

export const bodyJson: Midleware = async (req, res) => {

  if (req.headers["content-type"] !== "application/json" && req.headers["content-type"] !== "application/json; charset=utf-8") return 

    console.log("BODYJSON");
    
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString("utf-8");
  if(body === "") {
    req.body = {};
    return
  }

    req.body = JSON.parse(body);

};