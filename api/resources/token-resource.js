const express = require('express');
var router = express.Router();
var signup_manager = require('../resources/token-manager');

router.post("/", (req, res, next) => {
  signup_manager.signupUser(req.body, (error, response) => {
    
  });
})