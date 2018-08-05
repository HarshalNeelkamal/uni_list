var express = require('express');
var router = express.Router();
var manager = require('../managers/user-manager');

router.get("/:user_id",(req, res, next) => {
  manager.handleGet(req.params.user_id, result => {
    res.send(result[0]);
  });
});

router.post("/",(req, res, next) => {

});

router.patch("/",(req, res, next) => {

});

router.delete("/",(req, res, next) => {

});

module.exports = router;