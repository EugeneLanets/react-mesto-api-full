const { isCelebrateError } = require('celebrate');

const handleError = (error, req, res, next) => {
  let { status = 500, message } = error;

  if (isCelebrateError(error)) {
    const errorBody = error.details.get('body');
    const { details: [errorDetails] } = errorBody;
    message = errorDetails.message;
    status = 400;
  }

  res
    .status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка.'
        : message,
    });

  next();
};

module.exports = handleError;
