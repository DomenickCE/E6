const request = require("request-promise");
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/E6_Courses",{ useNewUrlParser: true });

mongoose.connection.once("open", function(){
    console.log("connection has been made!")
}).on("error", function(error){
    console.log(error);
})


var courseSchema = new mongoose.Schema({

    address:String,
    black:Number,
    blue:Number,
    city:String,
    country:String,
    elevation:Number,
    gold:Number,
    id:Number,
        holes:[{
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
        }],
    imageURL:String,
    legacyID:Number,
    name:String,
    par:Number,
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

///options is the parameters that a postal service uses to mail something to an address.

var options = {
    method:'GET',
    uri: "https://app-api.e6golf.com/courses"  ,
    headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuZTZnb2xmLmNvbSIsImV4cCI6MTU2NTkzNjI4MCwiaWF0IjoxNTM3MTM2MjgwLCJpc3MiOiJUcnVHb2xmIEFQSSIsImp0aSI6IjBmZmFmOTE4LWE3ZjUtNGI1YS1hY2YxLTVjMTI2YjExYTg0OSIsInNjb3BlcyI6WyJhcGk6YWNjZXNzIiwiYXBpOnBsYXllcjphY2Nlc3MiXSwic3ViIjoxMDQ2OTIsInN1YlR5cGUiOiJtb2RlbHMudXNlciIsInVzZXJJRCI6MTA0NjkyfQ.ltTXF_vfZYo97BxYi-aUiAJMemr71wVhDuhb85weYWU"
    },
    json:true
}



var courseBody = null;
var length = null;

//options and request go out at the samae time because the mail needs to know where its going!!

// callback is stating what happens when the request is received. CALLBACK IS USING THE MAIL AFTER REQUEST AND OPTIONS SEND IT.
function callback(err, request, body){
   if(err){ 
       
    console.log(err)
}
   
else{ 
      var courseBody = body

         var length = courseBody.courses.length
 console.log(length)

   var  Opt1and2 = [] 


  const request = require("request-promise")


  // it is not good to hit the server with a lot of requests which will overload it. (looping the request 90+ times)
    for(var i = 0; i < 5; i++){
    var options2 = {
        method:'GET',
        uri: "https://app-api.e6golf.com/courses/" + courseBody.courses[i].id  ,
        headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuZTZnb2xmLmNvbSIsImV4cCI6MTU2NTkzNjI4MCwiaWF0IjoxNTM3MTM2MjgwLCJpc3MiOiJUcnVHb2xmIEFQSSIsImp0aSI6IjBmZmFmOTE4LWE3ZjUtNGI1YS1hY2YxLTVjMTI2YjExYTg0OSIsInNjb3BlcyI6WyJhcGk6YWNjZXNzIiwiYXBpOnBsYXllcjphY2Nlc3MiXSwic3ViIjoxMDQ2OTIsInN1YlR5cGUiOiJtb2RlbHMudXNlciIsInVzZXJJRCI6MTA0NjkyfQ.ltTXF_vfZYo97BxYi-aUiAJMemr71wVhDuhb85weYWU"
        },
        json:true
    }
    function callback2(err, request, body){
        if(err){
            console.log(err);
        }
        else{

            var Options2Data = body;

            
            Opt1and2.push(Options2Data.holes); 

            
            };
     };
     
    }
   
    request(options2,callback2);
        //req, res

}

    console.log(Opt1and2)



    

        // console.log(
        //     courseBody
        // )


    }




// for(var i = 0; i < length; i++){

// course.insertMany(
    
//     [
        
//     {
//         address: coursesBody.courses[i].address,
//         black: coursesBody.courses[i].black,
//         blue: coursesBody.courses[i].blue,
//         city: coursesBody.courses[i].city,
//         country: coursesBody.courses[i].country,
//         elevation: coursesBody.courses[i].elevation,
//         gold: coursesBody.courses[i].gold,
//         id: coursesBody.courses[i].id,
//              holes:[{
//                 black: Number,
//                 blue: Number,
//                 courseID: Number,
//                 gold: Number,
//                 handicap: Number,
//                 holeImageURL: String,
//                 holeNumber: Number,
//                 par: Number,
//                 red: Number,
//                 white: Number,
//              }],
//         imageURL: coursesBody.courses[i].imageURL,
//         legacyID: coursesBody.courses[i].legacyID,
//        name: coursesBody.courses[i].name,
//         par: coursesBody.courses[i].par,
//         phone: coursesBody.courses[i].phone,
//        postalCode: coursesBody.courses[i].postalCode,
//         rating: coursesBody.courses[i].rating,
//         red: coursesBody.courses[i].red,
//         slope: coursesBody.courses[i].slope,
//         stateProvidence: coursesBody.courses[i].stateProvidence,
//         thumb: coursesBody.courses[i].thumb,
//         white: coursesBody.courses[i].white,
//         womensPar: coursesBody.courses[i].womensPar
//     }

// ],
//     function(err){
//     if(err){
//         console.log("error saving to database: " + err)
//     }
//     else{
//         console.log("Saving was a success")       
//     }

// })

// }


request(options,callback);
