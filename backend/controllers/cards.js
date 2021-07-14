const Card = require('../models/card');
const makeQuery = require('../utils/queries');

const getCards = (req, res, next) => {
  makeQuery(Card.find({}), res, next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  makeQuery(
    Card.create({ name, link, owner }), res, next,
  );
};

const deleteCard = async (req, res, next) => {
  const { id } = req.params;

  makeQuery(
    Card.findByIdAndDelete(id),
    res, next,
    'Запрошенная карточка не найдена',
  );
};

const likeCard = (req, res, next) => {
  const { id } = req.params;
  makeQuery(
    Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ),
    res, next,
    'Запрошенная карточка не найдена',
  );
};

const dislikeCard = (req, res, next) => {
  const { id } = req.params;
  makeQuery(
    Card.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true },
    ),
    res, next,
    'Запрошенная карточка не найдена',
  );
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
