# liri-node-app

LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

Commands:

 node liri.js concert-this 'artist/band name here'

 This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

     * Name of the venue
     * Venue location
     * Date of the Event

 node liri.js spotify-this-song 'song name here'     (use quotes for multi-word song titles)

 This will show the following information about the song in the terminal:

     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.

node liri.js movie-this 'movie name here'     (use quotes for multi-word song titles)

This will output the following information to your terminal:

       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

If you do not type a movie in, the program will output data for the movie 'Mr. Nobody.'


node liri.js do-what-it-says 

LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.



You will need your own spotify api keys to make this work.

Find video proof of LIRI Node App functionality on my portfolio page: https://hughescoding.github.io/portfolio/portfolio.html

