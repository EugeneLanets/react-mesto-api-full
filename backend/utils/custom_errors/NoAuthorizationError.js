class NoAuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoAuthorizationError';
    this.status = 403;
  }
}

module.exports = NoAuthorizationError;
