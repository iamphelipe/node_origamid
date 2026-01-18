
import { Core } from "./core/core.ts";
import {
  createClass,
  createCourse,
  getAllClassForCourse,
  getClass,
  getCourses,
  getCourseSlug,
} from "./core/database.ts";

const core = new Core

core.router.post('/cursos', (req, res) => {

    const { nome } = req;

    try {
        createCourse(req.body);
        res.status(201).end(`Curso: ${nome} criado!`);
    } catch {
        res.status(500).end("ERRO!"); 
    }
});

core.router.post('/aulas', (req, res) => {
    const {nome} = req;
    try {
        createClass(req.body);
        res.status(201).end(`Aula: ${nome} criada!`);
    } catch {
        res.status(500).end("ERRO!");
    } 
});

core.router.get("/cursos", (req, res) => {
    try {
        getCourses(res); 
    } catch {
        res.status(500).end("ERRO!");
    }
});

core.router.get("/curso", (req, res) => {
    try {
        getCourseSlug(req, res);
    } catch {
        res.status(500).end("ERRO!");
    }
});

core.router.get("/aulas", (req, res) => {

    try {
        getAllClassForCourse(req, res);
    } catch {
        res.status(500).end("ERRO!");
    }
});

core.router.get("/aula", (req, res) => {
    try {
        getClass(req, res);
    } catch {
        res.status(500).end("ERRO!");
    }
});

core.router.get("/", (req, res) => {
    res.status(200).end("Hello")
})

core.init();