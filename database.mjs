import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./db.sqlite");


db.exec(/*sql*/`
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

    const {slug, nome, descricao} = req;

    const cursos = db.prepare(/* sql */`
            SELECT * FROM "cursos"
        `).all();

    const isExist = cursos.map((curso) => curso.slug).find((s) => s === slug);
    if (!isExist) {
        console.log("Requisição abaixo:");
        console.log(req);
        const insert = db.prepare(/* sql */ `
            INSERT OR IGNORE INTO "cursos"
                ("slug", "nome", "descricao")
            VALUES
                (?, ?, ?)   
        `);
    
        insert.run(slug, nome, descricao);
        res.status(201).end(`Curso: ${nome} criado!`);
    } else {
        res.status(409).end(`O curso: ${nome} já foi criado!`); 
    }
    
};

export function createClass(req, res){

    const {curso_id, slug, nome} = req;

    const aulas = db.prepare(/* sql */`
        SELECT * FROM "aulas"
        `).all()
    
    const isExist = aulas.map((aula) => aula.slug).find((s) => s === slug);
    if(!isExist){
        console.log("Requisição aula abaixo:");
        console.log(req);
        const insert = db.prepare(/* sql */ `
            INSERT OR IGNORE INTO "aulas"
                ("curso_id", "slug", "nome")
            VALUES
                (?, ?, ?)
        `);
    
        insert.run(curso_id, slug, nome);
        res.status(201).end(`Aula: ${nome} criada!`);
    } else {
        res.status(409).end(`A aula ${nome} já foi criada!`);
    }

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

export function getAllClassForCourse(req, res) {
    const slug = req.query.get("curso");
    console.log(slug);

    const allClass = db.prepare(/* sql */`
        SELECT "a".* FROM "aulas" AS "a"
        JOIN "cursos" AS "c" ON "c"."id" = "a"."curso_id"
        WHERE "c"."slug" = ?
        `).all(slug);

    allClass.length === 0 ? res.status(409).json("Aula não encontrada") : res.status(200).json(allClass);

};

export function getClass(req, res) {
    
    const slugCurso = req.query.get("curso");
    const slugAula = req.query.get("slug");

    const allClass = db.prepare(/* sql */`
        SELECT * FROM "aulas"
        `).all();

    const isExist = allClass.map((c) => c.slug).find((s) => s === slugAula);

    if(isExist) {
        const classCourse = db.prepare(/* sql */`
            SELECT "a".* FROM "aulas" AS "a"
            JOIN "cursos" AS "c" ON "a"."curso_id" = "c"."id"
            WHERE "a"."slug" = ? AND "c"."slug" = ?
            `).get(slugAula, slugCurso);
            
            res.status(200).json(classCourse);    
    } else {
            res.status(409).json("Aula não encontrada!");
    }
}