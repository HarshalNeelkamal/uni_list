const express = require('express');
var router = express.Router();
var signup_manager = require('../managers/token-manager');

router.get("/resend",(req, res, next) => {
  const user = req.user;
  signup_manager.handleResendReq(user, (error, result) => {
    if(error){
      res.status(500).json({
        message: "failed to resend token"
      })
    }else {
      res.json(result);
    }
  });
});

router.get("/verify",( req, res, next) => {
  console.log("hehehe");
  const user = req.user;
  signup_manager.verificationsLinkHandler(user.id, (result) => {
      res.json(result);
  }, (error) => {
    res.status(500).send(error);
  });
});

module.exports = router;