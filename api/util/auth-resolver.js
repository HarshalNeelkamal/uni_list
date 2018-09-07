const connection = require('../util/connection');
const RECORD_FOR_ACTIVE_TOKEN = "SELECT * FROM user_token INNER JOIN users ON user_token.user_id = users.id WHERE token=? AND active=true";
const TOKEN_CHECK = "SELECT * FROM user_token INNER JOIN users ON user_token.user_id = users.id WHERE token=?";

module.exports = {
  // Success block will return an user
  user_for_token:function(token, success, failure){
    connection.query(RECORD_FOR_ACTIVE_TOKEN, [token], (error, res) => {
      if(error){
        //errored quering for token
        failure();
        return;
      } 
      // if there is no error.
      if(res.length > 0){    
        user = res[0];
        success(user);
      } else {
        // no token record found 
        failure();
      }
    });
  }, 
  is_super_user:function(token){
    this.user_for_token(token, (user) => {
      //develope a  mech, think on hte  table structure that would ebnable you to give Authorities. 
      return false;
    }, () => {
      return false;
    });
  }, 
  token_exists:function(token, success, failure) {
    connection.query(TOKEN_CHECK, [token], (error, res) => {
      if(error){
        failure();
      } else if(res.length > 0){
        success(res[0]);
      }else{
        failure();
      }
    });
  },
  

};