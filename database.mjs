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

db.exec(/*sql*/`
    CREATE TABLE IF NOT EXISTS "produtos" (
        "slug" TEXT PRIMARY KEY,
        "nome" TEXT NOT NULL,
        "categoria" TEXT NOT NULL,
        "preco" INTEGER NOT NULL
    );
`);

const insert = db.prepare(/*sql*/`
    INSERT OR IGNORE INTO "produtos"
        ("slug", "nome", "categoria", "preco")
    VALUES
        (?, ?, ?, ?)
`);

const item1 = insert.run("notebook", "Notebook", "eletronicos", 4000);
console.log(item1);
insert.run("celular", "Celular", "eletronicos", 2999);
insert.run("mesa", "Mesa", "moveis", 899);
insert.run("camisa", "Camisa", "roupas", 89);
const item2 = insert.run("tablet", "Tablet", "eletronicos", 2599);
console.log(item2);

const produtos = db.prepare(/*sql*/`SELECT * FROM "produtos"`).all();
console.log(produtos[1].nome);
const produto2 = db.prepare(/*sql*/`SELECT * FROM "produtos" WHERE "slug" = ?`).get('camisa');
console.log(produto2);
