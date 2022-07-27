var express = require('express');
var {check} = require('express-validator');
var router = express.Router();
var {list, create} = require('../controllers/trainingController');
const {} = require('../middleware/dataMiddleware');
const {checkString, validatorMiddleware} = require('../middleware/validatorMiddleware');
const {authMiddleware, adminMiddleware} = require('../middleware/authMiddleware');
var Subject = require('../models/Subject');

/* GET users listing. */
router.get('/', [
  authMiddleware,
  list
]);

router.post('/',[
  checkString('name',{length: {min: 1, max: 50}, required: true}),
  check('type')
    .exists().withMessage('missing `type`')
    .isIn(['Basic','Detailed']).bail(),
  check('subjects').exists().withMessage('missing `subjects`').bail().custom(async(value, { req }) => {
    if (!Array.isArray(value)){
      throw("`subjects` is not an array");
    };

    if (value.length === 0){
      throw("`subjects` is empty")
    };

    let existingSubjects = await Subject.find({},{name: 1, stream: 1, _id: 0});
    let subjectLookup = {};
    let streamArray = [];
    for (let item of existingSubjects){
      subjectLookup[item.name] = item.stream;
    };

    for (let item of value){
      if (!subjectLookup[item]){
        throw(`Found invalid subject: ${item}`);
      };
      streamArray.push(subjectLookup[item]);
    };

    streamArray = Array.from(new Set(streamArray));

    req.body.streams = streamArray;

    // get the subjects
    // if (value !== req.body.password) {
    //   throw new Error('Password confirmation does not match password');
    // }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  validatorMiddleware,
  authMiddleware, 
  adminMiddleware,
  create
])



module.exports = router;