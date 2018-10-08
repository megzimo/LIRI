/*
//////////////////////////////////////// LIRI COMMANDS ////////////////////////////////////////
Bands in Town - concert-this
Spotify - spotify-this-song
OMDb - movie-this
Twitter - do-what-it-says 
*/

require('dotenv').config();

let request = require('request');
let inquirer = require('inquirer');
let Spotify = require('node-spotify-api');

let header = "~*~*~*~*~*~*~*~*~*~*~ Your Results ~*~*~*~*~*~*~*~*~*~*~";
let inputQ = process.argv[2];


//////////////////////////////////////// OMDB Movie Request ////////////////////////////////////////
switch(inputQ){
    case "movie-this":
        let movie = process.argv[3];
        queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        
        request(queryURL, function (error, response, body) {
            if(!error && response.statusCode === 200) {
                let json = JSON.parse(body);
                let movieReturn = "\n" + header + "\n" + "\n \t Title: " + json.Title + "\n \t Release Year: " + json.Year + "\n \t IMDb Rating: " + json.Title + "\n \t Rotten Tomatoes: " + json.Ratings[1] + "\n \t Country: " + json.Country + "\n \t Language: " + json.Language + "\n \t Plot: " + json.Plot + "\n \t Cast: "  + json.Actors + "\n";
        
                console.log(movieReturn);
            };
        });
};


//////////////////////////////////////// Bands In Town ////////////////////////////////////////
// var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=trilogy";

//     request(queryURL, function (err, response, body) {
//         if (error) console.log(err);
//         var result  =  JSON.parse(body)[0];
//         console.log("Venue name " + result.venue.name);
//         console.log("Venue location " + result.venue.city);
//         console.log("Date of Event " +  moment(result.datetime).format("MM/DD/YYYY"));
//     });

//////////////////////////////////////// Next Section ////////////////////////////////////////


//////////////////////////////////////// Next Section ////////////////////////////////////////


//////////////////////////////////////// Next Section ////////////////////////////////////////