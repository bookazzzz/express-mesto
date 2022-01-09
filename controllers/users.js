const { request } = require('express');
const User = require('../models/user');

// Получаем всех пользователей
const getUsers = (req, res) => User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));

// Получаем пользоватея по ID
const getUser = (req, res) => {
  const { id } = request.params;
  return User
    .findById(id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(400).send({ message: `id: ${_id} не найден` });
      } else {
        response.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// Создаем пользователя
const createUser = (req, res) => {
  console.log(req.body);
  return User
    .create({ ...req.body })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        response.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else {
        response.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// Обновление профия
const updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  return User
    .findByIdAndUpdate(_id, { name, about })
    .then(({
      name, about, avatar, _id,
    }) => {
      res.status(200).send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        response.status(400).send({ message: 'Некорректные данные при обновлении профиля.' });
      } else {
        response.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// Обновление аватара
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  return User
    .findByIdAndUpdate(_id, { avatar })
    .then(({
      name, about, avatar, _id,
    }) => {
      res.status(200).send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        response.status(400).send({ message: 'Некорректные данные при обновлении аватара.' });
      } else {
        response.status(500).send({ message: 'Произошла ошибка' });
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
