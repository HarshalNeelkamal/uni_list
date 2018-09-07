const connection = require('../util/connection');
const verification = require('../util/verifications');
const token_manager = require('./token-manager');

const SELECT_FROM_USER_PROFILE = "SELECT * from users WHERE id = ?";
const CREATE_USER_PROFILE = "INSERT INTO users (user_name, email) VALUES (?,?)";
const DELETE_USER_PROFILE = "DELETE from users WHERE id = ?";
const PATCH_USER_PROFILE = "UPDATE users SET ";
const CHECK_EMAIL = "SELECT * FROM users WHERE email = ?";

module.exports = {

handleGet : function(user_id, callback) {
  connection.query(SELECT_FROM_USER_PROFILE,[user_id],(error, res) => {
    if(error){
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
      token_manager.deleteToken(user_id, result => {
        callback(null, {
          message: "user with id: "+user_id+" successfully deleted"
        });
      }, err => {
        callback(err);
      })
    }
  });
},

handlePatch : function(user, json_body, callback) {
  var args = [];
  var query = PATCH_USER_PROFILE;
  if(json_body.name_last || json_body.name_last === ""){
    query += "name_last = ?, ";
    args.push(json_body.name_last);
  }
  if(json_body.name_first || json_body.name_first === ""){
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
  args.push(user.id);
  connection.query(query, args, (error, result) => {
    if(error){
      callback(error);
    }else {
      this.handleGet(user.id, callback);
    }
  });
},

};