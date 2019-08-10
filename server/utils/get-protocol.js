module.exports = function getProtocol(req) {
  return req.headers['x-forwarded-proto'];
};
