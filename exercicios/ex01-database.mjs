import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./exercicios/lms.sqlite");
const armazenamentoCursos = [];

db.exec(/* sql*/`
    PRAGMA foreign_keys = 1;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;

    PRAGMA cache_size = 2000;
    PRAGMA busy_timeout = 5000;
    PRAGMA temp_store = MEMORY;
`);

db.exec(/* sql */`
    CREATE TABLE IF NOT EXISTS "cursos" (
      "id" INTEGER PRIMARY KEY,
      "slug" TEXT NOT NULL COLLATE NOCASE UNIQUE,
      "nome" TEXT NOT NULL,
      "descricao" TEXT NOT NULL
    ) STRICT;
`);

db.exec(/* sql */`
    CREATE TABLE IF NOT EXISTS "aulas" (
      "id" INTEGER PRIMARY KEY,
      "curso_id" INTEGER NOT NULL,
      "slug" TEXT NOT NULL COLLATE NOCASE,
      "nome" TEXT NOT NULL,
      FOREIGN KEY("curso_id") REFERENCES "cursos" ("id"),
      UNIQUE("curso_id", "slug")
    ) STRICT;        
`);

export function createCourse(req, res){
    console.log("Requisição abaixo:");
    console.log(req);
    const {slug, nome, descricao} = req;

    const isExist = armazenamentoCursos.find((curso) => curso === nome);

    if(!isExist) {
        const insert = db.prepare(/* sql */ `
            INSERT OR IGNORE INTO "cursos"
                ("slug", "nome", "descricao")
            VALUES
                (?, ?, ?)   
        `);
    
        insert.run(slug, nome, descricao);
        armazenamentoCursos.push(nome);
        res.status(201).end("Curso criado!");
    } else {
        console.log(`${nome} já existe!`)
    }
    
};

export function createClass(req, res){
    console.log("Requisição aula abaixo:");
    console.log(req);
    const {curso_id, slug, nome} = req;

    const insert = db.prepare(/* sql */ `
        INSERT OR IGNORE INTO "aulas"
            ("curso_id", "slug", "nome")
        VALUES
            (?, ?, ?)
    `);

    insert.run(curso_id, slug, nome);
    res.status(201).end("Aula criada!");
};

export function getCourses(res){
    const cursos = db.prepare(/* sql */`
        SELECT * FROM "cursos"
    `).all();
    res.status(200).json(cursos);
};

export function getCourseSlug(req, res) {
    const slug = req.query.get("slug");
    const cursos = db.prepare(/* sql */`
        SELECT * FROM "cursos"
    `).all();

    const isExist = cursos.map((curso) => curso.slug).find((s) => s === slug);
    
      try {

        if(isExist) {
             const curso = db.prepare(/* sql */`
            SELECT * FROM "cursos" WHERE "slug" = ? 
           `).get(slug);
           res.status(200).json(curso);
        } else {
         res.status(404).json("Not Found Course");
        }
        
    } catch {};
};