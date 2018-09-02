const emailExistence = require('email-existence');
const hash = require('js-hash-code');
const randomstring = require("randomstring");
const connection = require('../util/connection');
const MAKE_TOKEN_ENTRY = "INSERT INTO user_token (user_id, email, token, active) VALUES (?,?,?,?)";
const DELETE_TOKEN = "DELETE FROM user_token WHERE user_id = ?";
const email_client = require('../util/email-client');



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

  createToken : function(user) {
    const email = user.email;
    const id = user.id;
    const random_str = randomstring.generate(12);
    const token = this.generateToken([email, id, random_str]);
    connection.query(MAKE_TOKEN_ENTRY, [id, email, token, false] , (error, results) => {
      if(!error){
        //thats it, send email!
        email_client.sendEmailTo(email, user.user_name, token);
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