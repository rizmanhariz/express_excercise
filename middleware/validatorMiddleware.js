
const {validationResult, check, body} = require('express-validator')

exports.validatorMiddleware = async (req, res, next) => {
    let errors = validationResult(req);
    // console.log(errors)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    };

    next();
};

exports.checkStream = check('stream').exists({
    checkFalsy: true,
  }).withMessage('Missing stream')
  .isString().withMessage('stream is not a string')
  .isLength({min: 1, max: 10}).withMessage('must be between 1-10')
  .isIn([
    'Science',
    'Arts',
    'Commerce'
  ]).withMessage('not correct value');

exports.checkEmail = check('email').exists({
    checkFalsy: true,
  }).withMessage('Missing email')
  .isEmail().withMessage('Not a valid email')

exports.checkString = (paramName, paramOptions = {}) => {
    let validator = body(paramName).isString().withMessage(`${paramName} is not a string`);
    if(paramOptions.required){
        validator.exists({checkFalsy: true}).withMessage(`missing ${paramName}`)
    };
    if (paramOptions.length){
        let min = paramOptions.length.min ?? 0;
        let max = paramOptions.length.max || 100;
        validator.isLength({
            min,
            max
        }).withMessage(`${paramName} length must be minimum ${min} && max ${max}`);
    };

    return validator
}

// module.exports = [
//     validatorMiddleware,
//     checkStream
// ];