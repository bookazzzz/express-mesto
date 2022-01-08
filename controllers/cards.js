const { request } = require('express');
const Card = require('../models/card');

const getCards = (req, res) => {
  const { cardsList } = {};
  return Card.find(cardsList)
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(200).send(card))
  .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .then((card) => res.status(200).send(card))
  .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
};
