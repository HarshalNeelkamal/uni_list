const connection = require('../util/connection');
var bodyParser = require('body-parser');

const SELECT_FROM_USER_PROFILE = "SELECT * from user_profile WHERE id = ?";
const CREATE_USER_PROFILE = "INSERT INTO 'user_profile' (user_name, email) VALUES (?,?)";
const DELETE_USER_PROFILE = "DELETE from user_profile WHERE id = ?";

module.exports = {

handlePost : function(json_body, callback) {
  connection.query(CREATE_USER_PROFILE, json_body.user_name, json_body.email, (error, result) => {
    if(error){
      callback(error);
    }else {
      callback(null, result);
    }
  });
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

handleDelete : function(user_id) {
  connection.query(DELETE_USER_PROFILE, user_id, (error, result) => {
    if(error){
      callback(error);
    }else {
      callback(null, result);
    }
  });
},

handlePatch : function(user) {
 //var args = [json_body.user_name, json_body.email];
  // if(json_body.name_last){
  //   CREATE_USER_PROFILE += ", name_last";
  //   args.push(json_body.name_last);
  // }
  // if(json_body.name_first){
  //   CREATE_USER_PROFILE += ", name_first";
  //   args.push(json_body.name_first);
  // }
  // CREATE_USER_PROFILE += ", created_at)";
  //args.push("")
},

};