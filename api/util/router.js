var express = require('express');
var app = express();

//resource refrences
var auth_resolver = require('../util/auth-resolver');
var un_auth_user_res = require('../resources/un-authorised-user-resources');
var auth_user_res = require('../resources/authorised-user-resources');
var token_res = require('../resources/token-resource');


app.use("/signup", un_auth_user_res);

app.use("/token", (req, res, next) => {
  const token = req.headers.token;
  auth_resolver.token_exists(token, (user) => {
    req.user = user;
    next();
  }, () => {
    res.status(400).json({
      message: "User not authorised ot make this request"
    })
  })
});
app.use("/token", token_res);

app.use("/user", (req, res, next) => {
  const token = req.headers.token;
  auth_resolver.user_for_token(token, (user) => {
    req.user = user;
    next();
  }, () => {
    res.status(400).json({
      message: "User not authorised ot make this request"
    })
  })
});
app.use("/user", auth_user_res);

// // token endpoint routing
// var user_for_token = function(req, res, next) {
//   const token = req.headers.token;
//   auth_resolver.token_exists(token, (user) => {
//     next(user);
//   }, () => {
//     res.status(400).json({
//       message: "User not authorised ot make this request"
//     })
//   })
// }
// // user endpoint routing 
// var user_authorization = function(req, res, next){
//   const token = req.headers.token;
//   auth_resolver.user_for_token(token, (user) => {
//     next(user);
//   }, () => {
//     res.status(400).json({
//       message: "User not authorised ot make this request"
//     })
//   })
// }






module.exports = app;