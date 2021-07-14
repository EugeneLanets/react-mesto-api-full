class WrongCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongCredentialsError';
    this.status = 401;
  }
}

module.exports = WrongCredentialsError;
