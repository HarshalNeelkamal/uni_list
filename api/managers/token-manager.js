const emailExistence = require('email-existence');
const hash = require('js-hash-code');
const randomstring = require("randomstring");
const connection = require('../util/connection');
const MAKE_TOKEN_ENTRY = "INSERT INTO user_token (user_id, email, token, active) VALUES (?,?,?,?)";
const DELETE_TOKEN = "DELETE FROM user_token WHERE user_id = ?";
const email_client = require('../util/email-client');
const ACTIVATE_TOKEN = "UPDATE user_token SET active=true WHERE user_id=?";
const UPDATE_QUERY = "UPDATE user_token SET token=? WHERE user_id=?";
const TOKEN_BY_ID = "SELECT * FROM user_token WHERE user_id=?";

module.exports = {

  signupUser : function(json_body, callback){
    emailExistence.check(json_body.email, (error, response) => {
      if(error){
        callback(error);
      } else {
        callback(null, response);
      }
    });
  },

  verificationsLinkHandler : function(user_id, success, failure){
    connection.query(ACTIVATE_TOKEN, [user_id], (error, result) => {
      if(error){
        failure({success: 0, message: "token verification failed"});
      }else {
        success({success: 1, message: "token successfully verified"});
      }
    });
  },

  handleResendReq: function(user, callback){
    this.createToken(user, (token) => {
      callback(null, {token: token});
    }, () => {
      callback(null, {token:null});
    });
  },

  createToken : function(user, success, failure) {
    const email = user.email;
    const id = user.id;
    const random_str = randomstring.generate(12);
    const token = this.generateToken([email, id, random_str]);
    this.checkEntry(id, (present)=>{
      if(!present){
        connection.query(MAKE_TOKEN_ENTRY, [id, email, token, false] , (error, results) => {
          if(!error){
            email_client.sendEmailTo(email, user.user_name, token);
            success(token);
          }else{
            failure();
          }
        });
      }else {
        connection.query(UPDATE_QUERY, [token, id] , (error, results) => {
          if(!error){
            email_client.sendEmailTo(email, user.user_name, token);
            success(token);
          }else{
            failure();
          }
        });
      }
    }, () => {
      console.log("failed to query token record");
    });

    
  },

  checkEntry: function(user_id, success, failure) {
    connection.query(TOKEN_BY_ID, user_id, (error, res)=>{
      if(error){
        failure();
      }else if(res.length > 0) {
        success(true);
      }else {
        success(false);
      }
    });
  },

  deleteToken: function(user_id, success, failure) {
    connection.query(DELETE_TOKEN, [user_id] , (error, result) => {
      if(error){
        failure(error);
      }else{
        success(result);
      }
    });
  },

  generateToken : function(arr){
    const hash_6 = hash(arr);
    const token = randomstring.generate({
      length: 7,
      charset: 'alphanumeric',
    }) + hash_6;
    return token
  },

};