var express = require('express');
var router = express.Router();
var {body} = require('express-validator');
var {login, register, updatePW} = require('../controllers/authController');
var {checkEmail, checkString, validatorMiddleware} = require('../middleware/validatorMiddleware');
var {authMiddleware} = require('../middleware/authMiddleware');

router.post('/login', [
    checkEmail,
    checkString('password', {length: {min: 8, max: 20}}),
    validatorMiddleware,
    login,
]);

router.post('/register', [
    checkEmail,
    checkString('password', {length: {min: 8, max: 20}}),
    checkString('name',{length: {min: 1, max: 50}}),
    body('isAdmin')
        .exists({checkNull: true, checkFalsy: true}).withMessage('missing `isAdmin`')
        .isBoolean().withMessage('`isAdmin` must be a boolean'),
    validatorMiddleware,
    register,
]);

router.post('/changePassword', [
    checkString('old_password', {length: {min: 8, max: 20}}),
    checkString('new_password', {length: {min: 8, max: 20}}),
    validatorMiddleware,
    authMiddleware,
    updatePW,
]);

module.exports = router;