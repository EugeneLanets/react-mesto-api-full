const { verifyToken } = require('../utils/jwt');
const WrongTokenError = require('../utils/custom_errors/WrongTokenError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  if (!token) {
    throw new WrongTokenError('Неудачная попытка авторизации');
  }
  try {
    payload = verifyToken(token);
  } catch (err) {
    throw new WrongTokenError('Неудачная попытка авторизации');
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
