const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function tokenBuilder(user) { // { id, username}
  const payload = {
    sub: user.id,
    username: user.username,
  };
  const options = {
   expiresIn: '1d',
  };
  const token = jwt.sign(
    payload,
    JWT_SECRET,
    options,
  );
  return token;
}

module.exports = tokenBuilder