console.log("\x1b[31m","LIRI is loaded...","\x1b[0m","\n ");
console.log("How to use LIRI\n", "\nOption 1, type: ","node liri.js concert-this 'artist name'","\nThis will return a list of concert dates and venue for the selected artist\n" )
console.log("\nOption 2 type:","node liri.js spotify-this-song 'song title'", "\nThis will return a list of artists with songs matching the title, it will also include the album name it appears on, \nand *if available* a link to preview the song\n")
console.log("\nOption 3 type:","node liri.js movie-this 'movie name'","\nThis will return information about the movie entered. \nInformation will include Actor names, Ratings from IMDB and Rotten Tomatos, year of release, plot, and languages available in\n")
console.log("\nOption 4 type:","node liri.js do-what-it-says","\nThis will retun results on predefined search contained in the program\n")

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET

};
