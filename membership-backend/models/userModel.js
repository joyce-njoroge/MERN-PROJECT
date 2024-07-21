const db = require('../database');

const createUser = (username, hashedPassword, callback) => {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.run(query, [username, hashedPassword], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID });
  });
};

const getUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [username], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
};

module.exports = {
  createUser,
  getUserByUsername,
};