const Card = require('../models/card');
const NoAuthorizationError = require('../utils/custom_errors/NoAuthorizationError');
const NotFoundError = require('../utils/custom_errors/NotFoundError');

const checkCardOwner = async (req, res, next) => {
  const { id } = req.params;
  const card = await Card.findById({ _id: id })
    .orFail(() => next(new NotFoundError('Запрошенная карточка не найдена')));

  if (String(card.owner) !== req.user._id) {
    next(new NoAuthorizationError('Невозможно удалить чужую карточку'));
  }

  next();
};

module.exports = {
  checkCardOwner,
};
