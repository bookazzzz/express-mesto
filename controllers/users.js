const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Получаем всех пользователей
const getUsers = (req, res) => User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

// Получаем пользоватея по ID
const getUser = (req, res) => {
  const { _id } = req.params;
  return User
    .findById(_id)
    .orFail(() => { throw new Error('Нет пользователя с таким _id'); })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.message === 'Нет пользователя с таким _id') {
        res.status(404).send({ message: 'Нет пользователя с таким _id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Ошибка в ID пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// Создаем пользователя
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        Promise.reject(new Error('Неправильные почта или пароль'));
      }
    });
  bcrypt.hash(password, 10) // хешируем пароль
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные при создании пользователя.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
  next();
};

// Обновление профия
const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => { throw new Error('Страница с профилем не найдена'); })
    .then(({
      name, about, avatar, _id,
    }) => {
      res.status(200).send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные при обновлении профиля.' });
      } else if (err.message === 'Страница с профилем не найдена') {
        res.status(404).send({ message: 'Страница с профилем не найдена' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
  next();
};

// Обновление аватара
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  return User
    .findByIdAndUpdate(_id, { avatar }, { new: true })
    .orFail(() => { throw new Error('Страница с аватаром не найдена'); })
    .then(({
      name, about, avatar, _id,
    }) => {
      res.status(200).send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные при обновлении аватара.' });
      } else if (err.message === 'Страница с аватаром не найдена') {
        res.status(404).send({ message: 'Страница с аватаром не найдена' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
      next();
    });
};

// контроллер логина
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Error('Неправильные почта или пароль');
          }

          const { NODE_ENV, JWT_SECRET } = process.env;

          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
            { expiresIn: '7d' },
          );
          return res
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              secure: true,
              sameSite: 'none',
            })
            .send({ message: 'Вход совершен успешно' });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new Error('Поле email или password не должны быть пустыми');
      } else {
        res.status(401).send({ message: 'Отказ в доступе' });
      }
    });
  next();
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
