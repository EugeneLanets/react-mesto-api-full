const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const WrongCredentialsError = require('../utils/custom_errors/WrongCredentialsError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: (props) => `${props.value} is not valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(value) {
        const urlRegex = /(http|https):\/\/(www.)?(\S+)(:[0-9]+)?(\/|\/([\w#!/:.?+=&%@!\-/]))?#?/;
        return urlRegex.test(value);
      },
      message: 'Некорректная ссылка для аватара пользователя',
    },
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password')
    .orFail(new WrongCredentialsError('Неправильная почта или пароль'));

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    return Promise.reject(new WrongCredentialsError('Неправильная почта или пароль'));
  }

  return user;
};

module.exports = mongoose.model('user', userSchema);
