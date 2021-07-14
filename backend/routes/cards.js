const router = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { checkCardOwner } = require('../middlewares/owner');
const { validateId, validateNewCard } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validateNewCard, createCard);
router.delete('/:id', validateId, checkCardOwner, deleteCard);
router.put('/:id/likes', validateId, likeCard);
router.delete('/:id/likes', validateId, dislikeCard);

module.exports = router;
