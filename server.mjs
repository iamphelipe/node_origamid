import { createServer } from "node:http";
import { routes } from "./router.mjs";

const server = createServer( async (req, res) => {
    res.statusCode = 200;

    const url = new URL(req.url, 'http://localhost');

    const chunks = []
    for await (const chunk of req) {
        chunks.push(chunk)
    }

    const body = Buffer.concat(chunks).toString("utf-8");
    const handler = routes[req.method][url.pathname];
    if(handler) {
        handler(req, res)
    } else {
        res.statusCode = 404;
        res.end('Não encontrada');
    }

});

server.listen(3000, () => {
    console.log("Server: http://localhost:3000");
});