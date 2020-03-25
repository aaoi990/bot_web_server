var express = require('express');
var router = express.Router();

const User = require("../models/User");

/* GET users listing. */
router.get('/', function(req, res, next) {
const userOne = new User("Alexander", "fake@gmail.com");
  res.send(userOne);
});

module.exports = router;
