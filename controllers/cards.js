const Card = require('../models/card');

// Получаем все карточки с сервера
const getCards = (req, res) => {
  const { cardsList } = {};
  return Card.find(cardsList)
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        response.status(400).send({ message: 'Некорректные данные при получении карточек.' });
      } else {
        response.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// Создаем карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        response.status(400).send({ message: 'Некорректные данные при создании карточки.' });
      } else {
        response.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// Лайк на карточку
const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      response.status(404).send({ message: 'Oops карточка с указанным id не найдена.' });
    } else {
      response.status(500).send({ message: 'Произошла ошибка' });
    }
  });

// Удаляем карточку
const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      response.status(404).send({ message: 'Oops карточка с указанным id не найдена.' });
    } else {
      response.status(500).send({ message: 'Произошла ошибка' });
    }
  });

// Удаяем лайк
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(404).send({ message: 'Oops карточка с указанным id не найдена.' });
      } else {
        response.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
};
