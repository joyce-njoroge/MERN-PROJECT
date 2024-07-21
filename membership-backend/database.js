const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./my-database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    middleName TEXT,
    lastName TEXT,
    idNumber TEXT,
    dateOfBirth TEXT,
    photo BLOB
  )`);
});

module.exports = db;
