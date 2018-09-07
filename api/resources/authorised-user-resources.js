var express = require('express');
var router = express.Router();
var manager = require('../managers/authorised-user-manager');

router.get("/",(req, res, next) => {
  const user = req.user;
  manager.handleGet(user.id, (error, result) => {
    if(error){
      res.status(500).send(error)
    } else {
      res.send(result);
    }
  });
});

router.patch("/",(req, res, next) => {
  const user = req.user;
  manager.handlePatch(user, req.body, (error, result) => {
    if(error){
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
  
});

router.delete("/",(req, res, next) => {
  const user = req.user;
  manager.handleDelete(user.id, (error, result) => {
    if(error){
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;