const router = require('express').Router();
const usersRout = require('./users');
const cardsRout = require('./cards');

router.use('/users', usersRout);
router.use('/cards', cardsRout);

module.exports = router;
