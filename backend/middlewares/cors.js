const allowedCors = [
  'localhost:3000',
  'http://lanets.nomoredomains.club',
  'https://lanets.nomoredomains.club',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }

  next();
};

module.exports = cors;
