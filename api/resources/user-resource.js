var express = require('express');
var router = express.Router();
var manager = require('../managers/user-manager');

router.get("/:user_id",(req, res, next) => {
  manager.handleGet(req.params.user_id, (error, result) => {
    if(error){
      res.status(500).json({
        message: error
      })
    } else {
      res.send(result);
    }
  });
});

router.post("/",(req, res, next) => {
  manager.handlePost(req.body, (error, result) => {
    if(error){
      res.status(500).json({
        message: error
      })
    } else {
      res.send(result);
    }
  });
});

router.patch("/",(req, res, next) => {
  manager.handleGet(req.body.id, (error, result) => {
    if(error){
      res.status(500).json({
        message: error
      })
    } else {
      manager.handlePatch(req.body, (error, result) => {
        if(error){
          res.status(500).json({
            message: error
          })
        } else {
          res.send(result);
        }
      });
    }
  });
  
});

router.delete("/:user_id",(req, res, next) => {
  manager.handleDelete(req.params.user_id, (error, result) => {
    if(error){
      res.status(500).json({
        message: error
      })
    } else {
      res.send(result);
    }
  });
});

module.exports = router;