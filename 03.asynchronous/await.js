import sqlite3 from "sqlite3";
import { run, get, close } from "./db.js";

const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";

const db = new sqlite3.Database(":memory:");

// エラーなし
await run(db, createTableSql);

const result = await run(db, "INSERT INTO books (title) VALUES (?)", [
  "JavaScript入門",
]);
console.log(result.lastID);

const row = await get(db, "SELECT * FROM books WHERE id = ?", [result.lastID]);
console.log(row);

await run(db, "DROP TABLE books");

// エラーあり
await run(db, createTableSql);

try {
  await run(db, "INSERT INTO books (title) VALUES (?)", [null]);
} catch (err) {
  if (err?.code === "SQLITE_CONSTRAINT") {
    console.error(err.message);
  } else {
    throw err;
  }
}

try {
  await get(db, "SELECT * FROM author");
} catch (err) {
  if (err?.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}

await run(db, "DROP TABLE books");
await close(db);
