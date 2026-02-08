import { createServer } from "node:http";
import { Router } from "./router.mjs";
import { customRequest } from "./custom-request.mjs";
import { customResponse } from "./custom-response.mjs";
import { createClass, createCourse, getAllClassForCourse, getClass, getCourses, getCourseSlug } from "./database.mjs";

const router = new Router();

// Exercicio
router.post('/cursos', (req, res) => {
    try {
        createCourse(req.body, res);
    } catch {
        res.status(500).end("ERRO!"); 
    }
});

router.post('/aulas', (req, res) => {
    try {
        createClass(req.body, res);
    } catch {
        res.status(500).end("ERRO!");
    } 
});

router.get("/cursos", (req, res) => {
    try {
        getCourses(res); 
    } catch {
        res.status(500).end("ERRO!");
    }
});

router.get("/curso", (req, res) => {
    try {
        getCourseSlug(req, res);
    } catch {
        res.status(500).end("ERRO!");
    }
});

router.get("/aulas", (req, res) => {
    try {
        getAllClassForCourse(req, res);
    } catch {
        res.status(500).end("ERRO!");
    }
});

router.get("/aula", (req, res) => {
    try {
        getClass(req, res);
    } catch {
        res.status(500).end("ERRO!");
    }
});

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