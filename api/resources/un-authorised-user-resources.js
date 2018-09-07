var express = require('express');
var router = express.Router();
var manager = require('../managers/un-authorised-user-manager');
  
router.post("/",(req, res, next) => {
  manager.handlePost(req.body, (error, result) => {
    if(error){
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;