const Card = require('../models/card');

const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/pageNotFoundError');

// Получаем все карточки с сервера
const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Создаем карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Лайк на карточку
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new Error('NotFound'); })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Запрашиваемый адрес не найден'));
      } else if (err.name === 'CastError') {
        next(new BadRequest('Oops не можем поставить лайк - ошибка 400'));
      } else {
        next(err);
      }
    });
};

// Удаляем карточку
const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => { throw new NotFoundError('Запрашиваемый адрес не найден'); })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Oops не можем удалить карточку - ошибка 400'));
      } else {
        next(err);
      }
    });
};

// Удаяем лайк
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => { throw new Error('NotFound'); })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Запрашиваемый адрес не найден'));
      } else if (err.name === 'CastError') {
        next(new BadRequest('Oops не можем удалить лайк - ошибка 400'));
      } else {
        next(err);
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
