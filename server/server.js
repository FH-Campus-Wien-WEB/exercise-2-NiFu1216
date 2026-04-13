const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');
const { log } = require('console');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies
app.get('/movies', function (req, res) {
  res.status(200).send(Object.values(movieModel.movies))
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  let movie_imdbID = req.params.imdbID
  if (movieModel.movies[movie_imdbID]) {
    res.status(200).send(movieModel.movies[movie_imdbID])
  } else {
    res.status(404).send("Movie not found")
  }
})

// Configure a 'put' endpoint for a specific movie
app.put('/movies/:imdbID', function (req, res) {
  let movie_imdbID = req.params.imdbID
  let movie_from_request = req.body
  if (movie_imdbID === movie_from_request["imdbID"]) {
    if (movieModel.movies[movie_imdbID] === undefined) {
      movieModel.movies[movie_imdbID] = {}
      for (const key of Object.keys(movie_from_request)) {
        movieModel.movies[movie_imdbID][key] = movie_from_request[key]
      }
      res.sendStatus(201)
    } else {
      for (const key of Object.keys(movie_from_request)) {
        movieModel.movies[movie_imdbID][key] = movie_from_request[key]
      }
      res.sendStatus(200)
    }
  } else {
    res.sendStatus(400)
  }
})

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

