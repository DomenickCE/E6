const request = require("request");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://Domenick:Ilikebrunettes44@ds119578.mlab.com:19578/e6_clubhouse",{ useNewUrlParser: true });

// mongoose.connect("mongodb://localhost/E6_Courses",{ useNewUrlParser: true });

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

var UserScoresDB = new mongoose.Schema({
  FirstName:String,
  LastName:String,
  UserID: Number,
  parScore: String,
  Handicap: Number,
  Name: String,
  Email: String,
  UserName: String,
})

var userScoresDB = mongoose.model("UserScores", UserScoresDB);

var course= mongoose.model("courseHole", courseSchema);

var eventNumber = 15516;

var options = {
    method:'GET',
    uri: "https://app-api.e6golf.com/events/" + eventNumber,
    headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuZTZnb2xmLmNvbSIsImV4cCI6MTU2NTkzNjI4MCwiaWF0IjoxNTM3MTM2MjgwLCJpc3MiOiJUcnVHb2xmIEFQSSIsImp0aSI6IjBmZmFmOTE4LWE3ZjUtNGI1YS1hY2YxLTVjMTI2YjExYTg0OSIsInNjb3BlcyI6WyJhcGk6YWNjZXNzIiwiYXBpOnBsYXllcjphY2Nlc3MiXSwic3ViIjoxMDQ2OTIsInN1YlR5cGUiOiJtb2RlbHMudXNlciIsInVzZXJJRCI6MTA0NjkyfQ.ltTXF_vfZYo97BxYi-aUiAJMemr71wVhDuhb85weYWU"
    },
    json:true
}

function callback(err,request,body){
if(err){
 console.log(err)
  }
else{
      var request = require("request");
    let eventData = body;

    course.find({"id" : eventData.courses[0].id}, function(err, doc){
      console.log((doc))
})

    var options2 = {
        method:'GET',
        uri: "https://app-api.e6golf.com/events/" + eventNumber + "/leaderboard?start=0&size=100",
        headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuZTZnb2xmLmNvbSIsImV4cCI6MTU2NTkzNjI4MCwiaWF0IjoxNTM3MTM2MjgwLCJpc3MiOiJUcnVHb2xmIEFQSSIsImp0aSI6IjBmZmFmOTE4LWE3ZjUtNGI1YS1hY2YxLTVjMTI2YjExYTg0OSIsInNjb3BlcyI6WyJhcGk6YWNjZXNzIiwiYXBpOnBsYXllcjphY2Nlc3MiXSwic3ViIjoxMDQ2OTIsInN1YlR5cGUiOiJtb2RlbHMudXNlciIsInVzZXJJRCI6MTA0NjkyfQ.ltTXF_vfZYo97BxYi-aUiAJMemr71wVhDuhb85weYWU"
        },
        json:true
      }

      function callback2(err,request,body){
        if(err){
          console.log(err)
        }
        else{
          var request = require("request");


          var UserIDs = []
          

          var LdrBoardData = body;

            for(var n = 0; n < LdrBoardData.users.length; n++){
          UserIDs.push(LdrBoardData.users[n].id)     
            }

            // console.log(UserNames)
           
        for(var i = 0; i < UserIDs.length; i++){
            var options3 = {
                method:'GET',
                uri: "https://app-api.e6golf.com/events/"+ eventNumber + "/users/" + UserIDs[i],
                headers: {
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuZTZnb2xmLmNvbSIsImV4cCI6MTU2NTkzNjI4MCwiaWF0IjoxNTM3MTM2MjgwLCJpc3MiOiJUcnVHb2xmIEFQSSIsImp0aSI6IjBmZmFmOTE4LWE3ZjUtNGI1YS1hY2YxLTVjMTI2YjExYTg0OSIsInNjb3BlcyI6WyJhcGk6YWNjZXNzIiwiYXBpOnBsYXllcjphY2Nlc3MiXSwic3ViIjoxMDQ2OTIsInN1YlR5cGUiOiJtb2RlbHMudXNlciIsInVzZXJJRCI6MTA0NjkyfQ.ltTXF_vfZYo97BxYi-aUiAJMemr71wVhDuhb85weYWU"
                },
                json:true
              }
              
            function callback3(err,request,body){
              if(err){
                console.log(err)
              }
              else{
              
                var request = require("request");
                
                   var userScores = [];
               

                // console.log(LdrBoardData.users[this.i].id)
                 
                // console.log(LdrBoardData.users[i].id) 
                
                 
                  var  userBody = body


                  for(var j = 0; j < 18; j++){
                    
                    userScores.push(userBody.players[0].scores[0].par[j])
                    
            
                  }
                  

                  var options4 = {
                    method:'GET',
                    uri: "https://app-api.e6golf.com/users/" + LdrBoardData.users[this.i].username + "/profile",
                    headers: {
                        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuZTZnb2xmLmNvbSIsImV4cCI6MTU2NTkzNjI4MCwiaWF0IjoxNTM3MTM2MjgwLCJpc3MiOiJUcnVHb2xmIEFQSSIsImp0aSI6IjBmZmFmOTE4LWE3ZjUtNGI1YS1hY2YxLTVjMTI2YjExYTg0OSIsInNjb3BlcyI6WyJhcGk6YWNjZXNzIiwiYXBpOnBsYXllcjphY2Nlc3MiXSwic3ViIjoxMDQ2OTIsInN1YlR5cGUiOiJtb2RlbHMudXNlciIsInVzZXJJRCI6MTA0NjkyfQ.ltTXF_vfZYo97BxYi-aUiAJMemr71wVhDuhb85weYWU"
                    },
                    json:true
                  }
                  function callback4(err,request,body){
                    if(err){
                      console.log(err)
                    }
                    else{
                      
                     var profileBody = body;
                       
                      userScoresDB.create({

                        FirstName: profileBody.users[0].firstName,
                        LastName: profileBody.users[0].lastName,
                        Email: profileBody.users[0].email,
                        UserName: profileBody.users[0].username,
                        UserID: LdrBoardData.users[0].id,
                        Handicap: profileBody.users[0].handicap,
                        parScore: userScores

                       }, function (err, small) {
                        if (err) return handleError(err);
                        // saved!
                      });

                    } 
                  }

                }
                request(options4,callback4.bind({i:i}));
              }
              request(options3,callback3.bind({i:i}))
              
          }//for         
      }
}
request(options2,callback2)
}
}//first callback
request(options,callback)
