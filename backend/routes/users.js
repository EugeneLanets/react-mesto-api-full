const router = require('express').Router();

const {
  getUsers, getUserByID, updateUser, updateAvatar, getCurrentUserInfo,
} = require('../controllers/users');
const { validateId, validateUserUpdate, validateAvatarUpdate } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUserInfo);

router.get('/:id', validateId, getUserByID);

router.patch('/me', validateUserUpdate, updateUser);

router.patch('/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = router;
