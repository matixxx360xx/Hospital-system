const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

db.serialize(() => {
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
  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    visit_date TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'scheduled',
    FOREIGN KEY (patient_id) REFERENCES patients(id)
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
  INSERT OR IGNORE INTO patients
  (first_name, last_name, pesel, birth_date, phone, email)
  VALUES
  ('Anna', 'Nowak', '90010112345', '1990-01-01', '500100200', 'anna.nowak@mail.com'),
  ('Jan', 'Kowalski', '85050554321', '1985-05-05', '501200300', 'jan.kowalski@mail.com'),
  ('Maria', 'Wiśniewska', '92030311122', '1992-03-03', '502300400', 'maria.wisniewska@mail.com'),
  ('Piotr', 'Wójcik', '88070733344', '1988-07-07', '503400500', 'piotr.wojcik@mail.com'),
  ('Katarzyna', 'Kaczmarek', '95090955566', '1995-09-09', '504500600', 'kasia.kaczmarek@mail.com'),
  ('Michał', 'Lewandowski', '91011177788', '1991-11-11', '505600700', 'michal.lewandowski@mail.com'),
  ('Agnieszka', 'Zielińska', '93020299900', '1993-02-02', '506700800', 'agnieszka.zielinska@mail.com'),
  ('Tomasz', 'Szymański', '87040412121', '1987-04-04', '507800900', 'tomasz.szymanski@mail.com'),
  ('Paweł', 'Dąbrowski', '96060634343', '1996-06-06', '508900100', 'pawel.dabrowski@mail.com'),
  ('Ewa', 'Kamińska', '94080856565', '1994-08-08', '509000111', 'ewa.kaminska@mail.com')
`);



db.run(`
  INSERT OR IGNORE INTO visits
  (patient_id, visit_date, description, status)
  VALUES
  (1, '2026-06-11 10:00', 'Kontrola ogólna', 'scheduled'),
  (2, '2026-06-18 11:30', 'Ból brzucha - konsultacja', 'scheduled'),
  (3, '2026-06-20 09:00', 'Badania krwi', 'completed'),
  (4, '2026-06-25 12:15', 'Kontrola wyników', 'scheduled'),
  (5, '2026-06-28 08:30', 'Szczepienie', 'scheduled'),
  (6, '2026-07-02 14:00', 'Gorączka - diagnostyka', 'scheduled'),
  (7, '2026-07-05 10:45', 'Kaszel - konsultacja', 'scheduled'),
  (8, '2026-07-10 13:20', 'Ból gardła', 'scheduled'),
  (9, '2026-07-15 09:40', 'Kontrola wyników leczenia', 'scheduled'),
  (10, '2026-07-20 11:00', 'Ogólne badanie kontrolne', 'scheduled')
`);

db.run(`
  INSERT OR IGNORE INTO doctors
  (id, first_name, last_name, specialization, login, password)
  VALUES
  (1, 'Jan', 'Kowalski', 'Kardiolog', 'admin', '1234')
`);
});
app.get("/doctors", (req, res) => {
  db.all("SELECT * FROM doctors", (err, rows) => {
    if(err) {
      res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/visits", (req, res) => {
  db.all("SELECT * FROM visits", (err, rows) => {
    if(err) {
      res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/patients", (req, res) => {
  db.all("SELECT * FROM patients", (err, rows) => {
    if(err) {
      res.status(500).json({ error: err.message });
    }
    res.json(rows)
  });
});

app.listen(5000, () => {
  console.log("Serwer działa na porcie 5000");
});