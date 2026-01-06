import { createServer } from "node:http";
import { Router } from "./router.mjs";
import { customRequest } from "./custom-request.mjs";
import { customResponse } from "./custom-response.mjs";
import { createCourse } from "./exercicios/ex01-database.mjs";

const router = new Router();

router.get('/', (req, res) => {
    res.status(200).end('Home')
})

router.get('/produto/notebook', (req, res) => {
    res.status(200).end('Produtos - Notebook')
})

router.get('/contato', (req, res) => {
    res.status(200).end('Contato')
})

function postProduto(req, res){
    const cor = req.query.get("cor");
    res.status(201).json({produto: 'Notebook', cor});
}

router.post('/produto', postProduto);

// Exercicio
router.post('/cursos', (req, res) => {
    try {
        createCourse(req.body, res);
    } catch {
        res.status(500).end("ERRO!"); 
    }
})


const server = createServer( async (request, response) => {

    const req = await customRequest(request);
    const res = customResponse(response);

    const handler = router.find(req.method, req.pathname)
    if(handler) {
        res.statusCode = 200;
        handler(req, res)
    } else {
        res.status(404).end('Não encontrada');
    }

});

server.listen(3000, () => {
    console.log("Server: http://localhost:3000");
});