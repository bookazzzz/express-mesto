const router = require('express').Router();
const usersRout = require('./users');
const cardsRout = require('./cards');

router.use('/users', usersRout);
router.use('/cards', cardsRout);

router.use((req, res) => {
  res.status(404).json('Ресурс не найден');
});

module.exports = router;
