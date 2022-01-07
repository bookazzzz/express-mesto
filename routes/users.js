const router = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUserAvatar,
  updateUser
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/users/me/avatar', updateUserAvatar);
router.patch('/users/me', updateUser);


module.exports = router;