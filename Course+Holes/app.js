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

var courseSchema = new mongoose.Schema({
    address:String,
    black:Number,
    blue:Number,
    city:String,
    country:String,
    elevation:Number,
    gold:Number,
    id:Number,
    imageURL:String,
    legacyID:Number,
    name:String,
    par:Number,
    holesPar:String,
    phone:String,
    postalCode:String,
    rating:String,
    red:Number,
    slope:String,
    stateProvidence:String,
    thumbnailURL:String,
    white:Number,
    womensPar:Number
})

var course= mongoose.model("courseHole", courseSchema);

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
   var Options2Data = null;
    const request = require("request")
    var courseBody = body
    var Courselength = courseBody.courses.length
    console.log(Courselength)
          // it is not good to hit the server with a lot of requests which will overload it. (looping the request 90+ times)
    for(var i = 0; i < Courselength; i++){// Some array type errors OCCUR because the server get OVERLOADED.
        var options2 = {
            method:'GET',
            uri: "https://app-api.e6golf.com/courses/" + courseBody.courses[i].id  ,
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuZTZnb2xmLmNvbSIsImV4cCI6MTU2NTkzNjI4MCwiaWF0IjoxNTM3MTM2MjgwLCJpc3MiOiJUcnVHb2xmIEFQSSIsImp0aSI6IjBmZmFmOTE4LWE3ZjUtNGI1YS1hY2YxLTVjMTI2YjExYTg0OSIsInNjb3BlcyI6WyJhcGk6YWNjZXNzIiwiYXBpOnBsYXllcjphY2Nlc3MiXSwic3ViIjoxMDQ2OTIsInN1YlR5cGUiOiJtb2RlbHMudXNlciIsInVzZXJJRCI6MTA0NjkyfQ.ltTXF_vfZYo97BxYi-aUiAJMemr71wVhDuhb85weYWU"
            },
            json:true
        }
        function callback2(err, request, body){
            if (err) {
                console.log(err);}
            else {
                var Options2Data = body;

                var parHoles = [];

                for(var i = 0; i <= 17; i++){
                  console.log(courseBody.courses[i].id)
                  parHoles.push(Options2Data.holes[i].par);
                }

     course.insertMany(
         [{
             address: courseBody.courses[i].address,
             black: courseBody.courses[i].black,
             blue: courseBody.courses[i].blue,
             city: courseBody.courses[i].city,
             country: courseBody.courses[i].country,
             elevation: courseBody.courses[i].elevation,
             gold: courseBody.courses[i].gold,
             id: courseBody.courses[i].id,
             imageURL: courseBody.courses[i].imageURL,
             legacyID: courseBody.courses[i].legacyID,
            name: courseBody.courses[i].name,
             par: courseBody.courses[i].par,
             holesPar: parHoles,
             phone: courseBody.courses[i].phone,
            postalCode: courseBody.courses[i].postalCode,
             rating: courseBody.courses[i].rating,
             red: courseBody.courses[i].red,
             slope: courseBody.courses[i].slope,
             stateProvidence: courseBody.courses[i].stateProvidence,
             thumb: courseBody.courses[i].thumb,
             white: courseBody.courses[i].white,
             womensPar: courseBody.courses[i].womensPar
         }],
         function(err){
         if(err){
             console.log("error saving to database: " + err)
         }
         else{
             console.log("Saving was a success")
         }
     })

    }
   }
         request(options2,callback2);
    }//Api Request loop
 }
};// main callback
  //req, res
  request(options,callback);
