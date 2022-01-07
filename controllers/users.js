const { request } = require("express");
const User = require("../models/user");

const getUsers = (req, res,) => {
   return User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
};

const getUser = (req, res,) => {
  const { id } = request.params
  return User
        .findById(id)
        .then(user => res.status(200).send(user))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

const createUser = (req, res,) => {
  console.log(req.body)
  return User
        .create({...req.body})
        .then(user => res.status(201).send(user))
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}


const updateUser = (req, res,) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  return User
    .findByIdAndUpdate(_id, { name, about } )
    .then(({ name, about, avatar, _id }) => {
      res.status(200).send({ name, about, avatar, _id });
    })
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  return User
    .findByIdAndUpdate(_id, { avatar })
    .then(({ name, about, avatar, _id }) => {
      res.status(200).send({ name, about, avatar, _id });
    })
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar
}