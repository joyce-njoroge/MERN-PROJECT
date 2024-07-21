const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  userModel.createUser(username, hashedPassword, (err, user) => {
    if (err) return res.status(500).json({ message: 'Error registering user' });
    res.status(201).json(user);
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  userModel.getUserByUsername(username, (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

module.exports = {
  register,
  login,
};