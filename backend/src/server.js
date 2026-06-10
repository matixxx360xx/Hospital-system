const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

db.run(`
  CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    login TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    pesel TEXT UNIQUE,
    birth_date TEXT,
    phone TEXT,
    email TEXT
  )
`);

db.run(`
  INSERT OR IGNORE INTO doctors
  (id, first_name, last_name, specialization, login, password)
  VALUES
  (1, 'Jan', 'Kowalski', 'Kardiolog', 'admin', '1234')
`);

app.get("/doctors", (req, res) => {
  db.all("SELECT * FROM doctors", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(5000, () => {
  console.log("Serwer działa na porcie 5000");
});