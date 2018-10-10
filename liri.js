/*
//////////////////////////////////////// LIRI COMMANDS ////////////////////////////////////////
Bands in Town - concert-this
Spotify - spotify-this-song
OMDb - movie-this
Twitter - do-what-it-says 
*/

require('dotenv').config();
const keys = require("./keys.js");
let fs = require("fs");
let request = require('request');
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let moment = require('moment');

let header = "~*~*~*~*~*~*~*~*~*~*~ Your Results ~*~*~*~*~*~*~*~*~*~*~";
let footer = "~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~";
let inputQ = process.argv[2];


switch(inputQ){
    case "movie-this":
        omdbMovie();
    break;

    case "spotify-this-song": 
        spotifySong();
    break;

    case "concert-this":
        bandsInTown();
    break;

    case "dow-what-it-says":
        twitter();
    break;
};

//////////////////////////////////////// OMDb Movies ////////////////////////////////////////
function omdbMovie(){
    let movie = process.argv.splice(3, process.argv.length - 1).join(" ");
    queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
    request(queryURL, function (error, response, body) {
        if(!error && response.statusCode === 200) {
            let json = JSON.parse(body);
            let movieReturn = "\n" + header + "\n" + "\n \t Title: " + json.Title + "\n \t Release Year: " + json.Year + "\n \t IMDb Rating: " + json.Title + "\n \t Rotten Tomatoes: " + json.Ratings[1].Value + "\n \t Country: " + json.Country + "\n \t Language: " + json.Language + "\n \t Plot: " + json.Plot + "\n \t Cast: "  + json.Actors + "\n \t" + footer;
    
            console.log(movieReturn);
        };
        if (error) {
            console.log ("Oops! Something went wrong");
        }
    });
}; // end omdb fn

//////////////////////////////////////// Spotify ////////////////////////////////////////
function spotifySong() {
    let trackQuery = process.argv.splice(3, process.argv.length - 1).join(" ");

    if (!trackQuery){
        trackQuery = "Hypnotic Nights"
    }
     spotify.search({ type: "track", query: trackQuery}, function(err, data) {
        if (err) {
           console.log("Something went wrong: " + err);
           return;
        }
        else {
            songInfo = "\n" + header + "\n" + "\n \t Song Title: " + trackQuery + "\n \t Artist: " + data.tracks.items[0].album.artists[0].name + "\n \t Album: " + data.tracks.items[0].album.name + "\n \t view in Spotify: " + data.tracks.items[0].album.external_urls.spotify + "\n \n" + footer;
        
            console.log(songInfo);
        }
   }) 
}; // end spotify fn

//////////////////////////////////////// Bands In Town ////////////////////////////////////////
function bandsInTown() {
let artist = process.argv.splice(3, process.argv.length - 1).join(" ");
let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=trilogy";

    request(queryURL, function (error, response, body) {
        if(!error && response.statusCode === 200) {
            var result  =  JSON.parse(body)[0];
            let concertResults = "\n" + header + "\n" + "\n \t Artist: " + artist + "\n \t Venue Name: " + result.venue.name + "\n \t Venue Location: " + result.venue.city + "\n \t Concert Date: " + moment(result.datetime).format("MM/DD/YYYY") +"\n \n" + footer;
            console.log(concertResults);

            // if(value == undefined) {
            //     console.log("Bummer, this band isn't touring. Try different band!");
            // };
            // if(value == 0) {
            //     console.log("Hmm, I didn't catch that. What band are you looking for?")  
            // };

        };
        if (error) { 
            console.log("Oops! Something went wrong")
        };
    });
}; // end bands in town fn


//////////////////////////////////////// Twitter ////////////////////////////////////////

function twitter() {

};