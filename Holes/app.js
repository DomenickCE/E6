const request = require("request");
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/E6_Courses",{ useNewUrlParser: true });

mongoose.connection.once("open", function(){
    console.log("connection has been made!")
}).on("error", function(error){
    console.log(error);
});


var holeSchema = new mongoose.Schema({
            
    black: Number,
    blue: Number,
    courseID: Number,
    gold: Number,
    handicap: Number,
    holeImageURL: String,
    holeNumber: Number,
    par: Number,
    red: Number,
    white: Number,

});



var holes = mongoose.model('holes', holeSchema);

var options = {
    method:'GET',
    uri: "https://app-api.e6golf.com/courses"  ,
    headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuZTZnb2xmLmNvbSIsImV4cCI6MTU2NTkzNjI4MCwiaWF0IjoxNTM3MTM2MjgwLCJpc3MiOiJUcnVHb2xmIEFQSSIsImp0aSI6IjBmZmFmOTE4LWE3ZjUtNGI1YS1hY2YxLTVjMTI2YjExYTg0OSIsInNjb3BlcyI6WyJhcGk6YWNjZXNzIiwiYXBpOnBsYXllcjphY2Nlc3MiXSwic3ViIjoxMDQ2OTIsInN1YlR5cGUiOiJtb2RlbHMudXNlciIsInVzZXJJRCI6MTA0NjkyfQ.ltTXF_vfZYo97BxYi-aUiAJMemr71wVhDuhb85weYWU"
    },
    json:true
}
function callback(err, request, body){
    if(err){ 
        
     console.log(err)
 } 
 else{ 
    var courseBody = body
 
    var length = courseBody.courses.length
  console.log(length)

          // it is not good to hit the server with a lot of requests which will overload it. (looping the request 90+ times)
    for(var i = 0; i < length; i++){
        var options2 = {
            method:'GET',
            uri: "https://app-api.e6golf.com/courses/" + courseBody.courses[i].id  ,
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuZTZnb2xmLmNvbSIsImV4cCI6MTU2NTkzNjI4MCwiaWF0IjoxNTM3MTM2MjgwLCJpc3MiOiJUcnVHb2xmIEFQSSIsImp0aSI6IjBmZmFmOTE4LWE3ZjUtNGI1YS1hY2YxLTVjMTI2YjExYTg0OSIsInNjb3BlcyI6WyJhcGk6YWNjZXNzIiwiYXBpOnBsYXllcjphY2Nlc3MiXSwic3ViIjoxMDQ2OTIsInN1YlR5cGUiOiJtb2RlbHMudXNlciIsInVzZXJJRCI6MTA0NjkyfQ.ltTXF_vfZYo97BxYi-aUiAJMemr71wVhDuhb85weYWU"
            },
            json:true,
        }
        function callback2(err, request, body){
            if(err){
                console.log(err);
            }
            else{
                var length = courseBody.courses.length
                var Options2Data = body;
    
                
                console.log(length);
    
            
                };
                    
            };
     }
 
 }






     
    };// loop
       
    // holes.insertMany([
    //     {
    //     black: Number,
    //     blue: Number,
    //     courseID: Number,
    //     gold: Number,
    //     handicap: Number,
    //     holeImageURL: String,
    //     holeNumber: Number,
    //     par: Number,
    //     red: Number,
    //     white: Number,
    // }
    //  ]);

    request(options2,callback2);
    //req, res
    request(options,callback);