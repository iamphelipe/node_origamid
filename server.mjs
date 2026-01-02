import { createServer } from "node:http";
import { Router } from "./router.mjs";

const router = new Router();

router.get('/', (req, res) => {
    res.end('Home')
})

router.get('/produto/notebook', (req, res) => {
    res.end('Produtos - Notebook')
})

router.get('/contato', (req, res) => {
    res.end('Contato')
})

router.post('/produto', (req, res) => {
    res.end('Notebook Post')
})

console.log(router.routes);

const server = createServer( async (req, res) => {

    const url = new URL(req.url, 'http://localhost');

    const chunks = []
    for await (const chunk of req) {
        chunks.push(chunk)
    }

    const body = Buffer.concat(chunks).toString("utf-8");
    const handler = router.find(req.method, url.pathname)
    if(handler) {
        res.statusCode = 200;
        handler(req, res)
    } else {
        res.statusCode = 404;
        res.end('Não encontrada');
    }

});

server.listen(3000, () => {
    console.log("Server: http://localhost:3000");
});