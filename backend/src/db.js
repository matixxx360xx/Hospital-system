const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./hospital.db", (err) => {
  if (err) {
    console.error("Błąd połączenia z bazą:", err.message);
  } else {
    console.log("Połączono z bazą SQLite");
  }
});

module.exports = db;