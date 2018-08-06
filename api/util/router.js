var express = require('express');
var router = express.Router();

//resource refrences
var auth = require('../managers/auth-manager');
var user = require('../resources/user-resource');


//request routing
// router.use("*", auth.getJSONWebKeySet(), (req, res, next) => {
//   next();
// });

router.use("/user", user);

module.exports = router;