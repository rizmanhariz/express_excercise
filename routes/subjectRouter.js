var express = require('express');
var {check} = require('express-validator');
var {validatorMiddleware, checkStream, checkString} = require('../middleware/validatorMiddleware');
var {authMiddleware, adminMiddleware} = require('../middleware/authMiddleware');
var router = express.Router();
const {
  create,
  list
} = require('../controllers/subjectController');

/* GET users listing. */
router.get('/', [
  check('limit').toInt(),
  check('sort').toUpperCase(),
  authMiddleware,
  list
]);

router.post('/', [
  checkString('name', {required: true, length: {min: 1, max: 50}}),
  checkStream,
  validatorMiddleware,
  authMiddleware,
  adminMiddleware,
  create
]);

module.exports = router;