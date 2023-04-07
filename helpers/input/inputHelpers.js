// const bcrypt = require('bcryptjs')
const validateUserInput = (email, password) => {
  return email && password;
};

module.exports = { validateUserInput };
