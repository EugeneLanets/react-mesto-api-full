class WrongTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongTokenError';
    this.status = 401;
  }
}

module.exports = WrongTokenError;
