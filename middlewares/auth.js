const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (headers) => {
  if (!headers.authorization) {
    return null; 
  }

  const token = headers.authorization.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, config.secret);
    return decodedToken.userId;
  } catch (error) {
    console.error(error);
    return null; 
  }
};

module.exports = auth;
