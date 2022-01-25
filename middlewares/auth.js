const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new Error('Необходима авторизация');
  }

  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
    );
  } catch (err) {
    next(res.status(401).send({ message: 'Необходима авторизация' }));
  }
  req.user = payload;
  next();
};
