var express = require("express");
var bodyParser = require("body-parser");
// var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// It works on the client and on the server
var request = require("request");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// var PORT = 3000;
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
var exphbs = require("express-handlebars");

// Require handlebars helpers
// var helpers = require("handlebars-helpers")();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configure middleware

// Use morgan logger for logging requests
// app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/mongoscraper", {
//   useMongoClient: true
// });

// mongoose.connect("mongodb://localhost/mongoscraper");
mongoose.connect("mongodb://heroku_bqlphdj8:a6dejfk344q41g8s5ve31v27r2@ds243325.mlab.com:43325/heroku_bqlphdj8");

require("./controllers/scrapercontroller.js")(app);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
