const memberModel = require('../models/memberModel');
const multer = require('multer');

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

const getAllMembers = (req, res) => {
  memberModel.getAllMembers((err, members) => {
    if (err) {
      console.error('Error fetching members:', err);
      return res.status(500).json({ message: 'Error fetching members' });
    }
    // Convert photo buffer to base64 string
    const membersWithPhotos = members.map(member => {
      if (member.photo) {
        const base64Photo = member.photo.toString('base64');
        return { ...member, photo: base64Photo };
      }
      return member;
    });
    
    console.log('Members fetched:', membersWithPhotos);
    res.json(membersWithPhotos);
  });
};

const createMember = (req, res) => {
  const { firstName, middleName, lastName, idNumber, dateOfBirth } = req.body;
  const photo = req.file ? req.file.buffer : null; // Ensure photo is handled as buffer

  console.log('Creating member with data:', {
    firstName,
    middleName,
    lastName,
    idNumber,
    dateOfBirth,
    photo: photo ? 'Uploaded' : 'No photo'
  });

  memberModel.createMember(firstName, middleName, lastName, idNumber, dateOfBirth, photo, (err, member) => {
    if (err) {
      console.error('Error creating member:', err);
      return res.status(500).json({ message: 'Error creating member' });
    }
    console.log('Member created:', member);
    res.status(201).json(member);
  });
};

module.exports = {
  getAllMembers,
  createMember,
  upload,
};
