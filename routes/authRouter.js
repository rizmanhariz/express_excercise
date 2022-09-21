var express = require('express');
var router = express.Router();
var {body} = require('express-validator');
var {login, register, updatePW} = require('../controllers/authController');
var {checkEmail, checkString, validatorMiddleware} = require('../middleware/validatorMiddleware');
var {authMiddleware} = require('../middleware/authMiddleware');
var passport = require('passport');

router.post('/login', [
    checkEmail,
    checkString('password', {length: {min: 8, max: 20}}),
    validatorMiddleware,
    login,
]);

router.get('/google', [
    passport.authenticate('google', { scope: ['profile'] })
]);

router.get('/google/redirect', [
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.send("YOU DID IT")
    }
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