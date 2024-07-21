const db = require('../database');

const createMember = (firstName, middleName, lastName, idNumber, dateOfBirth, photo, callback) => {
  const query = 'INSERT INTO members (firstName, middleName, lastName, idNumber, dateOfBirth, photo) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(query, [firstName, middleName, lastName, idNumber, dateOfBirth, photo], function (err) {
    if (err) {
      console.error('Error creating member:', err);
      return callback(err);
    }
    console.log('Member created with ID:', this.lastID);
    callback(null, { 
      id: this.lastID,
      firstName, 
      middleName, 
      lastName, 
      idNumber, 
      dateOfBirth, 
      photo 
     });
  });
};

const getAllMembers = (callback) => {
  const query = 'SELECT * FROM members';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching members:', err);
      return callback(err);
    }
    console.log('Fetched members:', rows);
    callback(null, rows);
  });
};

module.exports = {
  createMember,
  getAllMembers,
};
