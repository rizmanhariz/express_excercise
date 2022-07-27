var express = require('express');
var router = express.Router();
var {authMiddleware} = require('../middleware/authMiddleware');
var {getMe, updateMe} = require('../controllers/userController');
var {checkString, validatorMiddleware} = require('../middleware/validatorMiddleware');

/* GET users listing. */
router.get('/me', [
  authMiddleware,
  getMe
]);

router.post('/me',[
  checkString('name', {required: true, length:{min: 1, max: 20}}),
  validatorMiddleware,
  authMiddleware,
  updateMe
])

module.exports = router;