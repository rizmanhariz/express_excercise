var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send("Welcome");
  // res.render(path.join('__dirname','../views/login.jade'));
  res.render('login');
});

module.exports = router;