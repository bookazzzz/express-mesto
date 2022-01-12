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
    .orFail(() => {throw new Error ('Нет пользователя с таким _id' )})
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.message === 'Нет пользователя с таким _id') {
        res.status(404).send({ message: 'Нет пользователя с таким _id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Ошибка в ID пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};

// Создаем пользователя
const createUser = (req, res) => {
  console.log(req.body);
  return User
    .create({ ...req.body })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные при создании пользователя.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// Обновление профия
const updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  return User
    .findByIdAndUpdate(_id, { name, about },{new: true})
    .orFail(() => {throw new Error ('Страница с профилем не найдена' )})
    .then(({
      name, about, avatar, _id,
    }) => {
      res.status(200).send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные при обновлении профиля.' });
      } else if (err.message === 'Страница с профилем не найдена') {
        res.status(404).send({ message: 'Страница с профилем не найдена' }); }
      else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// Обновление аватара
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  return User
    .findByIdAndUpdate(_id, { avatar }, {new: true})
    .orFail(() => {throw new Error ('Страница с аватаром не найдена' )})
    .then(({
      name, about, avatar, _id,
    }) => {
      res.status(200).send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные при обновлении аватара.' });
      } else if (err.message === 'Страница с аватаром не найдена') {
        res.status(404).send({ message: 'Страница с аватаром не найдена' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
