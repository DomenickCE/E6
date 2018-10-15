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

                  parHoles.push(Options2Data.holes[i].par);
                }

     course.insertMany(
         [{
             address: Options2Data.courses[0].address,
             black: Options2Data.courses[0].black,
             blue: Options2Data.courses[0].blue,
             city: Options2Data.courses[0].city,
             country: Options2Data.courses[0].country,
             elevation: Options2Data.courses[0].elevation,
             gold: Options2Data.courses[0].gold,
             id: Options2Data.courses[0].id,
             imageURL: Options2Data.courses[0].imageURL,
             legacyID: Options2Data.courses[0].legacyID,
            name: Options2Data.courses[0].name,
             par: Options2Data.courses[0].par,
             holesPar: parHoles,
             phone: Options2Data.courses[0].phone,
            postalCode: Options2Data.courses[0].postalCode,
             rating: Options2Data.courses[0].rating,
             red: Options2Data.courses[0].red,
             slope: Options2Data.courses[0].slope,
             stateProvidence: Options2Data.courses[0].stateProvidence,
             thumb: Options2Data.courses[0].thumb,
             white: Options2Data.courses[0].white,
             womensPar: Options2Data.courses[0].womensPar
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
