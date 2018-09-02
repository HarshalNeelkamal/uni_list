const email_existance = require('email-check');

module.exports = {

verify_email : function(email_id, callback) {
  callback(true);
  // console.log(email_id);
  // email_existance(email_id)
  //   .then( res => {
  //     console.log(res);
  //     callback(res);
  //   }).catch( err => {
  //     console.log(err);
  //     callback(false);
  //   });
  // email_existance.check(email_id, function(error, response){
  //   if(error){
  //     console.log(error);
  //     callback(false);
  //   }else{
  //     console.log(response);
  //     callback(response);
  //   }
  // });
}

};