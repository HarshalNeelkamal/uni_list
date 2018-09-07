const connection = require('../util/connection');
const verification = require('../util/verifications');
const token_manager = require('./token-manager');

const SELECT_FROM_USER_PROFILE = "SELECT * from users WHERE id = ?";
const CREATE_USER_PROFILE = "INSERT INTO users (user_name, email) VALUES (?,?)";
const DELETE_USER_PROFILE = "DELETE from users WHERE id = ?";
const PATCH_USER_PROFILE = "UPDATE users SET ";
const CHECK_EMAIL = "SELECT * FROM users WHERE email = ?";

module.exports = {

handlePost : function(json_body, callback) {
  connection.query(CHECK_EMAIL, json_body.email, (error, result) => {
    if(result && result.length > 0){
      callback("Email already registered, try logging in");
    }else{
      this.verifyInfo(json_body, () => {
        this.createUser(json_body, callback);
      }, () => {
        callback("Invalid Info, please try again with another email id");
      });
    }
  })
  
},

verifyInfo : function(user, success_block, failure_block) {
  verification.verify_email(user.email, (verified) => {
    if(verified){
      success_block();
    }else{
      failure_block();
    }
  });
},

createUser : function(json_body, callback) {
  connection.query(CREATE_USER_PROFILE, [json_body.user_name, json_body.email], (error, result) => {
    if(error){
      callback(error);
    }else {
      this.handleGet(result.insertId, (error, result) => {
        if(error){
          callback({message: "Something went wrong", user_id: result.insertId});
        }else {
          token_manager.createToken(result[0], (token) => {
            callback(null, {user: result, token: token});
          }, () => {
            callback(null, {user: result, token:null});
          });
        }
      });
    }
  });
},

handleGet : function(user_id, callback) {
  connection.query(SELECT_FROM_USER_PROFILE,[user_id],(error, res) => {
    if(error){
      callback(error);
    }else {
      callback(null, res);
    }
  });
},

};