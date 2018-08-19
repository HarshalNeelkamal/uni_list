const email_existance = require('email-existence');

module.exports = {

verify_email : function(email_id, callback) {
  email_existance.check(email_id, function(error, response){
    if(error){
      callback(false);
    }else{
      callback(response);
    }
  });
}

};