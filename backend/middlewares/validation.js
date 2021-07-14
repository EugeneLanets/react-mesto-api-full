const { celebrate, Joi } = require('celebrate');

const passwordMessages = {
  'string.empty': 'Заполните необходимое поле password',
  'any.required': 'Заполните необходимое поле password',
  'string.min': 'Пароль должен содержать не менее 8 символов',
};

const emailMessages = {
  'string.email': 'Некорректный email',
  'string.empty': 'Заполните необходимое поле email',
  'any.required': 'Заполните необходимое поле email',
};

const nameMessages = {
  'string.min': 'Минимальная длина поля 2 символа',
  'string.max': 'Максимальная длина поля 30 символов',
};

const urlMessages = { 'string.uri': 'Некорректная ссылка' };

const idMessages = { 'string.pattern.base': 'Некорректный id' };

const cardNameMessages = {
  'string.empty': 'Введите название карточки',
  'any.required': 'Введите название карточки',
  ...nameMessages,
};

const cardLinkMessages = {
  'string.empty': 'Введите адрес изображения',
  'any.required': 'Введите адрес изображения',
  ...urlMessages,
};

const updateUserMessages = {
  'string.empty': 'Поле не должно быть пустым',
  'any.invalid': 'Поле не должно быть пустым',
  ...nameMessages,
};

const updateAvatarMessages = {
  'string.empty': 'Поле не должно быть пустым',
  'any.invalid': 'Поле не должно быть пустым',
  ...cardLinkMessages,
};

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(emailMessages),
    password: Joi.string().required().min(8).messages(passwordMessages),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(emailMessages),
    password: Joi.string().required().min(8).messages(passwordMessages),
    name: Joi.string().allow('').default('Жак-Ив Кусто').min(2)
      .max(30)
      .messages(nameMessages),
    about: Joi.string().allow('').default('Исследователь').min(2)
      .max(30)
      .messages(nameMessages),
    avatar: Joi.string().allow('').uri().messages(urlMessages),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages(idMessages),
  }),
});

const validateNewCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(cardNameMessages),
    link: Joi.string().required().uri().messages(cardLinkMessages),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2)
      .max(30)
      .messages(updateUserMessages),
    about: Joi.string().min(2)
      .max(30)
      .messages(updateUserMessages),
  }),
});

const validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri()
      .messages(updateAvatarMessages),
  }),
});

module.exports = {
  validateId,
  validateSignIn,
  validateSignUp,
  validateNewCard,
  validateUserUpdate,
  validateAvatarUpdate,
};
