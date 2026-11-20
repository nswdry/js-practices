import sqlite3 from "sqlite3";
import { run, get, close } from "./db.js";

const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";

const db = new sqlite3.Database(":memory:");

// エラーなし
run(db, createTableSql)
  .then(() =>
    run(db, "INSERT INTO books (title) VALUES (?)", ["JavaScript入門"]),
  )
  .then((result) => {
    console.log(result.lastID);
    return get(db, "SELECT * FROM books WHERE id = ?", [result.lastID]);
  })
  .then((row) => {
    console.log(row);
    return run(db, "DROP TABLE books");
  })

  // エラーあり
  .then(() => run(db, createTableSql))
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", [null]))
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => get(db, "SELECT * FROM author"))
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => run(db, "DROP TABLE books"))
  .then(() => close(db));
