var request = require("request");
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var app = express();

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

var course= mongoose.model("course", courseSchema);



var options = {
    url: "https://app-api.e6golf.com/courses",
    auth: {
        'bearer': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuZTZnb2xmLmNvbSIsImV4cCI6MTU2NTkzNjI4MCwiaWF0IjoxNTM3MTM2MjgwLCJpc3MiOiJUcnVHb2xmIEFQSSIsImp0aSI6IjBmZmFmOTE4LWE3ZjUtNGI1YS1hY2YxLTVjMTI2YjExYTg0OSIsInNjb3BlcyI6WyJhcGk6YWNjZXNzIiwiYXBpOnBsYXllcjphY2Nlc3MiXSwic3ViIjoxMDQ2OTIsInN1YlR5cGUiOiJtb2RlbHMudXNlciIsInVzZXJJRCI6MTA0NjkyfQ.ltTXF_vfZYo97BxYi-aUiAJMemr71wVhDuhb85weYWU"
    }
};

var courseBody = null;
var length = null;

function callback(err, request, body){
   if(err){ 
       
    console.log(err)
}
   
   { 
       courseBody = JSON.parse(body);
       length = courseBody.courses.length;
    }
};



for(var i = 0; i < length; i++){

course.insertMany(
    
    [
        
    {
        address: coursesBody.courses[i].address,
        black: coursesBody.courses[i].black,
        blue: coursesBody.courses[i].blue,
        city: coursesBody.courses[i].city,
        country: coursesBody.courses[i].country,
        elevation: coursesBody.courses[i].elevation,
        gold: coursesBody.courses[i].gold,
        id: coursesBody.courses[i].id,
        imageURL: coursesBody.courses[i].imageURL,
        legacyID: coursesBody.courses[i].legacyID,
       name: coursesBody.courses[i].name,
        par: coursesBody.courses[i].par,
        phone: coursesBody.courses[i].phone,
       postalCode: coursesBody.courses[i].postalCode,
        rating: coursesBody.courses[i].rating,
        red: coursesBody.courses[i].red,
        slope: coursesBody.courses[i].slope,
        stateProvidence: coursesBody.courses[i].stateProvidence,
        thumb: coursesBody.courses[i].thumb,
        white: coursesBody.courses[i].white,
        womensPar: coursesBody.courses[i].womensPar
    }

],
    function(err){
    if(err){
        console.log("error saving to database: " + err)
    }
    else{
        console.log("Saving was a success")       
    }

})

}


request(options,callback);