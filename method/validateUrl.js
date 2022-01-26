const validator = require('validator');

module.exports.validateUrl = (url) => {
  const validate = validator.isURL(url);
  if (validate) {
    return url;
  }
  throw new Error('URL validation err');
};
