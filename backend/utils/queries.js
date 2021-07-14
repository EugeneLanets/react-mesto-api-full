const NotFoundError = require('./custom_errors/NotFoundError');

const handleOrFail = (message) => new NotFoundError(message);

const modifyQuery = (query, message) => (message ? query.orFail(handleOrFail(message)) : query);

const makeQuery = (query, res, next, errorMessage) => {
  modifyQuery(query, errorMessage)
    .then((receivedData) => res.send(receivedData))
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        const status = 400;
        const message = `Некорректный запрос. ${error.message}`;
        next({ ...error, status, message });
      }
      next(error);
    });
};

module.exports = makeQuery;
