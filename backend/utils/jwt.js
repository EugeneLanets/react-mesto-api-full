require('dotenv').config();

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const getToken = (payload) => jwt.sign(
  payload,
  NODE_ENV === 'production' ? JWT_SECRET : 'secret phrase',
  { expiresIn: '7d' },
);

const verifyToken = (token) => jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret phrase');

module.exports = {
  getToken,
  verifyToken,
};
