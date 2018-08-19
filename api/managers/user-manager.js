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

handleGet : function(user_id, callback) {
  connection.query(SELECT_FROM_USER_PROFILE,user_id,(error, res) => {
    if(error){
      console.log(error);
      callback(error);
    }else {
      callback(null, res);
    }
  });
},

handleDelete : function(user_id, callback) {
  connection.query(DELETE_USER_PROFILE, user_id, (error, result) => {
    if(error){
      callback(error);
    }else {
      callback(null, {
        message: "user with id: "+user_id+" successfully deleted"
      });
    }
  });
},

handlePatch : function(json_body, callback) {
  var args = [];
  var query = PATCH_USER_PROFILE;
  if(json_body.name_last){
    query += "name_last = ?, ";
    args.push(json_body.name_last);
  }
  if(json_body.name_first){
    query += "name_first = ?, ";
    args.push(json_body.name_first);
  }
  if(json_body.email){
    query += "email = ?, ";
    args.push(json_body.email);
  }
  if(json_body.user_name){
    query += "user_name = ?, ";
    args.push(json_body.user_name);
  }
  query += "updated_at = NOW() WHERE id = ?";
  args.push(json_body.id);
  connection.query(query, args, (error, result) => {
    if(error){
      callback(error);
    }else {
      this.handleGet(json_body.id, callback);
    }
  });
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
          callback(null, result);
          token_manager.createToken(result[0]);
        }
      });
    }
  });
}

};