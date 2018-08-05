const connection = require('../util/connection');

module.exports = {

handlePost : function(user) {
  
},

handleGet : function(user_id, callback) {
  connection.query("SELECT * from user_profile WHERE id = ?",user_id,(error, res) => {
    if(error){
      console.log(error);
      callback(error);
    }else {
      callback(res);
    }
  });
},

handleDelete : function(user_id) {

},

handlePatch : function(user) {

},

};