
var express = require("express");
var app = express();
var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

// Routes
module.exports = function(app) {

  app.get("/", function(req, res) {
    console.log("Hitting / route");
    db.Article.find({})
    .then(function(found) {
      var hbsObject = {
       articles: found
     };
     console.log("HANDLEBARS OBJECT");
     console.log(hbsObject);

     res.render("home", hbsObject);
   });
  });



  app.get("/saved", function(req, res) {
    console.log("Hitting /saved route");
   //  db.Article.find({})
   //  .then(function(found) {
   //    var hbsObject = {
   //     articles: found
   //   };
   //   console.log("HANDLEBARS OBJECT");
   //   console.log(hbsObject);

   //   res.render("saved", hbsObject);
   // 
     db.Article.find({})
    // Specify that we want to populate the retrieved users with any associated notes
    .populate("note")
    .then(function(found) {

      var hbsObject = {
       articles: found
     };
     console.log("HANDLEBARS OBJECT");
     console.log(hbsObject);

     res.render("saved", hbsObject);
      // If able to successfully find and associate all Users and Notes, send them back to the client
      // res.json(dbUser);
    });

    });









  // A GET route for scraping the curl website
  app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    request("https://www.teamusa.org/USA-Curling", function(error, response, html) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(html);

      // Now, we grab every h3 within an article tag, and do the following:
      $("h3").each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this).children("a").text();
        result.link = $(this).children("a").attr("href");

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
        .then(function(dbArticle) {
            // View the added result in the console
            console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
            console.log(dbArticle);
          })
        .catch(function(err) {
            console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            return 
          });
      });
      res.redirect("/");
 
      // res.render("home", hbsObject); 
    });
  });

  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push: {note: dbNote._id} });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.post("/articlessaved/:id", function(req, res) {
      console.log("We are in articels saved.");
    // Create a new note and pass the req.body to the entry
    db.Article.findOne({ _id: req.params.id })
      .then(function() {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, {$set: { saved: true }});
     })
      .then(function(res) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(res);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
      console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
  });


    app.delete("/trash/:id", function(req, res) {
    // Using the id passed in the id parameter, delete the document
    db.Article.remove({ _id: req.params.id })
      .then(function() {
      });
  });

};


