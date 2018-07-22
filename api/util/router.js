var express = require('express');
var router = express.Router();

//resource refrences
var auth = require('../managers/auth-manager');
var user = require('../resources/user-resource');


//request routing
router.use("*", (req, res, next) => {
  if(auth.intercept(req) === true){
    next();
  }else{
    res.status(500);
    res.json({
      message: "un-authorised attempt"
    });
  }
});

router.use("/user", user);

module.exports = router;