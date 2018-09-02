var CRLF = '\r\n';
require('dotenv').config();
var AWS = require('aws-sdk');
const options = { accessKeyId : process.env.EMAIL_KEY, secretAccessKey : process.env.EMAIL_SECRETE, region : "us-east-1" }
var ses = new AWS.SES(options);

module.exports = {
  sendEmailTo: function(email_id, user_name, token){
    var params = {
      Destination: {
        ToAddresses: [
           email_id
        ]
       }, 
       Message: {
        Body: {
         Html: {
          Charset: "UTF-8", 
          Data: '<div><div>Hello <b>'+user_name+'!</b><div><a href="localhost:3000/uni/user_signup?token='+token+'&user_name='+user_name+'" >Click here To Verify it\'s you</a></div>'
         }, 
         Text: {
          Charset: "UTF-8", 
          Data: "This is a verification email."
         }
        }, 
        Subject: {
         Charset: "UTF-8", 
         Data: "Uni-List Verification Email"
        }
       },
       Source: process.env.VERIFICATION_SOURCE, 
       SourceArn: process.env.EMAIL_POLICY_ARN
    };

    console.log(params);
    ses.sendEmail(params, (error, data)=> {
      if(error){
        console.log(">> Email verification failed with error: \n"+error);
      }else {
        console.log(">> Email verification passed with mail Id: "+data);
      }
    });
  }
}
