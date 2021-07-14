require('dotenv').config();

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { getToken } = require('../utils/jwt');
const makeQuery = require('../utils/queries');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { _id } = await User.findUserByCredentials(email, password);

    const token = getToken({ _id });

    res
      .cookie('jwt', token, {
        maxAge: 360000 * 24 * 7,
        httpOnly: true,
      })
      .end();
  } catch (err) {
    next(err);
  }
};

const getUsers = (req, res, next) => {
  makeQuery(User.find({}), res, next);
};

const getUserByID = (req, res, next) => {
  const { id } = req.params;
  makeQuery(
    User.findById(id),
    res, next,
    'Запрошенный пользователь не найден',
  );
};

const getCurrentUserInfo = async (req, res, next) => {
  req.params.id = req.user._id;
  getUserByID(req, res, next);
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);

  User.create(
    {
      name, about, avatar, email, password: hash,
    },
  )
    .then((user) => res.send({ data: { email: user.email, _id: user._id } }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        const status = 409;
        const message = 'Адрес электронной почты занят';

        next({ ...err, status, message });
      }
      next(err);
    });
};

const update = (req, res, updateObject, next) => {
  const id = req.user._id;
  makeQuery(
    User.findByIdAndUpdate(
      id,
      { $set: updateObject },
      { new: true, runValidators: true },
    ),
    res, next,
    'Запрошенный пользователь не найден',
  );
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  update(req, res, { name, about }, next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  update(req, res, { avatar }, next);
};

module.exports = {
  createUser,
  getCurrentUserInfo,
  getUsers,
  getUserByID,
  login,
  updateAvatar,
  updateUser,
};
