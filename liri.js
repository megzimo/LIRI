/*
//////////////////////////////////////// LIRI COMMANDS ////////////////////////////////////////
Bands in Town - concert-this
Spotify - spotify-this-song
OMDb - movie-this
Twitter - do-what-it-says 
*/

require('dotenv').config();
const keys = require("./keys.js");
const fs = require('fs');
let request = require('request');
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let moment = require('moment');

let header = "~*~*~*~*~*~*~*~*~*~*~ Your Results ~*~*~*~*~*~*~*~*~*~*~";
let footer = "~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~";
let inputQ = process.argv[2];

function liriBot(){
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

    case "do-what-it-says":
        doWhatItSays();
        break;

    case "tweet":
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
            let movieReturn = "\n \t" + header + "\n" + "\n \t Title: " + json.Title + "\n \t Release Year: " + json.Year + "\n \t IMDb Rating: " + json.Title + "\n \t Rotten Tomatoes: " + json.Ratings[1].Value + "\n \t Country: " + json.Country + "\n \t Language: " + json.Language + "\n \t Plot: " + json.Plot + "\n \t Cast: "  + json.Actors + "\n \n \t" + footer;
    
            console.log(movieReturn);
            logLiri(movieReturn);

        };
        if (error) {
            console.log ("Oops! Something went wrong");
        }

    }); // ends request

}; 

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
            logLiri(songInfo);
        }
   }) 
}; // end spotify fn

//////////////////////////////////////// Bands In Town ////////////////////////////////////////
function bandsInTown() {
let artist = process.argv.splice(3, process.argv.length - 1).join(" ");
    if(artist === "") {
        console.log("Hmm, I didn't catch that. What band are you looking for?") 
        return 
    };

let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryURL, function (error, response, body) {
        if(!error && response.statusCode === 200) {
            var result  =  JSON.parse(body);
            
            for(var i=0; i<=2; i++){
                let concertResults = "\n" + header + "\n" + "\n \t Artist: " + artist + "\n \t Venue Name: " + result[i].venue.name + "\n \t Venue Location: " + result[i].venue.city + ", " + result[i].venue.region + "\n \t Concert Date: " + moment(result[i].datetime).format("MM/DD/YYYY") +"\n \n" + footer;
                console.log(concertResults);
                logLiri(concertResults);
            }; // ends for loop
        };

        if (error) { 
            console.log("Oops! Something went wrong")
        };
    });
}; // end bands in town fn


//////////////////////////////////////// Twitter ////////////////////////////////////////

function twitter() {

};


//////////////////////////////////////// Do What It Says ////////////////////////////////////////
 function doWhatItSays(){

    //  console.log("do what it says, dammit!")
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error){
            console.log("Oops, something went wrong");
            return;
        }
            let getSong = data.split(",");

                switch(getSong[0]){
                case "spotify-this-song":

                spotify.search({ type: 'track', query: getSong[1]}, function(error, data) {
                    if (error){
                        console.log("Oops, something went wrong.")
                        return;
                    }

                    let track = data.tracks.items[0];

    let tInfo = `
    ${header}

    Artist: ${track.album.artists[0].name}
    Song Title: ${track.name}
    Album: ${track.album.name}
    View in Spotify: ${track.preview_url}

    ${footer}
    `
                        console.log(tInfo);
                        logLiri(tInfo);
                });
                break;
            }
    });
}; // ends do what it says fn
}; // ends liriBot fn


//////////////////////////////////////// Log LIRI data ////////////////////////////////////////

function logLiri(data){
    fs.appendFile("log.txt", data + "\n", function(error) {
        if(error) {
            return console.log(error)
        };
    });
}; // ends logLiri fn





liriBot();




