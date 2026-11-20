import sqlite3 from "sqlite3";
import timers from "timers/promises";

const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";

const db = new sqlite3.Database(":memory:");

// エラーなし
db.run(createTableSql, () => {
  db.run(
    "INSERT INTO books (title) VALUES (?)",
    ["JavaScript入門"],
    function () {
      console.log(this.lastID);

      db.get("SELECT * FROM books WHERE id = ?", [this.lastID], (_err, row) => {
        console.log(row);

        db.run("DROP TABLE books");
      });
    },
  );
});

await timers.setTimeout(100);

// エラーあり
db.run(createTableSql, () => {
  db.run("INSERT INTO books (title) VALUES (?)", [null], (err) => {
    if (err) {
      console.error(err.message);
    }

    db.get("SELECT * FROM author", (err) => {
      if (err) {
        console.error(err.message);
      }

      db.run("DROP TABLE books", () => {
        db.close();
      });
    });
  });
});
