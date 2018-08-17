var emailExistence = require('email-existence');

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

  }  
};