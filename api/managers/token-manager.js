const emailExistence = require('email-existence');
const hash = require('js-hash-code');
const randomstring = require("randomstring");
const connection = require('../util/connection');
const MAKE_TOKEN_ENTRY = "INSERT INTO user_token (user_id, email, token, active) VALUES (?,?,?,?)";



module.exports = {

  signupUser = function(json_body, callback){
    emailExistence.check(json_body.email, (error, response) => {
      if(error){
        callback(error);
      } else {
        callback(null, response);
      }
    });
  },

  createToken = function(user) {
    const email = user.email;
    const id = user.id;
    const token = generateToken([email, id, random_str]);
    connection.query(MAKE_TOKEN_ENTRY, id, emai, token, false, (error, results) => {
      if(!error){
        //thats it, send email!
      }
    });
  },  

  generateToken = function(arr){
    const random_str = randomstring.generate(12);
    const hash_6 = hash(arr);
    const token = randomstring.generate({
      length: 12,
      charset: 'alphanumeric',
    });
    token += hash_6;
    return token
  },

};