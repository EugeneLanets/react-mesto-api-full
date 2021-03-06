const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const app = express();

const handleError = require('./middlewares/errors');

const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateSignIn, validateSignUp } = require('./middlewares/validation');
const { login, createUser, logout } = require('./controllers/users');
const NotFoundError = require('./utils/custom_errors/NotFoundError');

const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://lanets.nomoredomains.club',
    'https://lanets.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const start = async () => {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

start();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors(corsOptions));

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('/logout', logout);

app.use('*', () => {
  throw new NotFoundError('Неверный роутер, страница не найдена');
});

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
