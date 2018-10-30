//this npm module allows me to store my spotify api keys safely in .env file
require("dotenv").config();

var keys = require("./keys.js");
//this npm module "node-spotify-api" allows me to use node with spotify api
var Spotify = require("node-spotify-api");
//this npm module "Request" is designed to be the simplest way possible to make http calls. 
var request = require("request");
//this npm module "fs" is used to read a text file
var fs = require("fs");

var moment = require("moment");
moment().format();

var imdbRating;
var rottenTomatoRating;
var userCmdPrompt = process.argv[2];
var userSearch = process.argv[3];
var spotify = new Spotify(keys.spotify);

//User commands and their function calls
var runLiri = function () {
    if (userCmdPrompt === "concert-this") {
        concertThis();
    } else if (userCmdPrompt === "spotify-this-song") {
        spotifyThis();
    } else if (userCmdPrompt === "movie-this") {
        movieThis();
    } else if (userCmdPrompt === "do-what-it-says") {
        doWhat();
    } else {
        console.log("\n>>> Error: enter a valid command <<<\n\n- concert-this\n- spotify-this-song\n- movie-this\n- do-what-it-says\n")
    }
};

//Function to get/parse/format/return concert info
var concertThis = function (artistName) {

    if (userSearch === undefined) {
        console.log("\x1b[31m", "Error: You have to search for a band!", "\x1b[0m");
        return;
    } else {
        artistName = userSearch
    };

    console.log("\n>>> Concert Search: " + artistName + " <<<\n");

    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=e321c5df3b581205409373ce3eb9c448";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var data = JSON.parse(body);
            console.log("\nThese are upcoming concerts by: " + artistName.toUpperCase());
            for (var i = 0; i < data.length; i++) {

                var date = data[i].datetime;
                date = moment(date).format("MM/DD/YYYY");
                console.log("\n                   ") //seperate multiple results
                console.log("\x1b[36m", "Date: ", "\x1b[0m" + date)
                console.log("\x1b[36m", "Venue: ", "\x1b[0m" + data[i].venue.name);

                if (data[i].venue.region == "") {
                    console.log("\x1b[36m", "Location: ", "\x1b[0m" + data[i].venue.city + ", " + data[i].venue.country);
                } else {
                    console.log("\x1b[36m", "Location: ", "\x1b[0m" + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                };
            }
            console.log("\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
        }
    })
};

//Function to get/format/return song info
var spotifyThis = function (songName) {

    if (userSearch === undefined) {
        songName = "The Sign Ace of Base";
    } else {
        songName = userSearch
    };
    console.log("\x1b[33m", ">>>", "\x1b[0m", "\x1b[31m", " You Searched: ", "\x1b[0m", "\x1b[32m" + songName, "\x1b[0m" + "\x1b[33m", " <<<", "\x1b[0m");


    spotify.search({
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error Code: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (let i = 0; i < songs.length; i++) {
                console.log(i + 1);
                //I'm using ANSI color codes to set text colors in terminal for fun and effect
                console.log("\x1b[34m", "Artist: ", "\x1b[0m" + songs[i].artists[0].name);
                console.log("\x1b[34m", "Song: ", "\x1b[0m" + songs[i].name);
                console.log("\x1b[34m", "Album: ", "\x1b[0m" + songs[i].album.name);
                console.log("\x1b[34m", "Song Preview: ", "\x1b[0m", "\x1b[35m" + songs[i].preview_url, "\x1b[0m");
                console.log("\x1b[34m", "\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n", "\x1b[0m");
            }
        }
    );
};
//Function to get/parse/format/return movie info
var movieThis = function (movieName) {
    if (userSearch === undefined) {
        movieName = "Mr. Nobody";
    } else {
        movieName = userSearch
    };
    console.log("\n>>> You Searched For: " + movieName + " <<<\n");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        //console.log(body); I tried this to find my data targets because omdb docs are sparse. it was a hot mess to read.
        if (!error && response.statusCode === 200) {

            var data = JSON.parse(body);
            //console.log(data); So much better now, its actully readable and it has colors? How do I do that? ^^
            for (i = 0; i < data.Ratings.length; i++) {
                if (data.Ratings[i].Source === "Rotten Tomatoes") {
                    rottenTomatoRating = data.Ratings[i].Value;
                }
                if (data.Ratings[i].Source === "Internet Movie Database") {
                    imdbRating = data.Ratings[i].Value;
                }
            }
            console.log("\x1b[36m", "Movie Title: ", "\x1b[0m" + data.Title);
            console.log("\x1b[36m", "Movie Released in: ", "\x1b[0m" + data.Year);
            console.log("\x1b[36m", "IMDB Rating is: ", "\x1b[0m" + imdbRating);
            console.log("\x1b[36m", "Rotten Tomatoes Rating is: ", "\x1b[0m" + rottenTomatoRating);
            console.log("\x1b[36m", "Country: ", "\x1b[0m" + data.Country);
            console.log("\x1b[36m", "Available Languages: ", "\x1b[0m" + data.Language);
            console.log("\x1b[36m", "Plot: ", "\x1b[0m" + data.Plot);
            console.log("\x1b[36m", "Actors: ", "\x1b[0m" + data.Actors);
            console.log("\x1b[36m", "\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n", "\x1b[0m");
        } else {
            console.log("\x1b[31m%\x1b[5m", "Houston..We have a problem:(\n", "\x1b[0m")
        }
    })
};
//do-what-it-says function to read input from text file, uses fs.readFile. found in npm docs. This was hard. 
var doWhat = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        doWhatEntry = data.split(",")
        userCmdPrompt = doWhatEntry[0];
        userSearch = doWhatEntry[1];
        runLiri();
    });
};
runLiri();