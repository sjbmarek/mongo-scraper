# mongo-scraper

# ~ the lastest news in curling ~

### Overview

This is a web app that lets users view and leave comments on the latest news. Mongoose and Cheerio are used to scrape news from another site.

### Technologies

1. express

2. express-handlebars

3. mongoose

4. body-parser

5. cheerio

6. request


## File Structure

MVC structure.


## App Summary


  1. When a user visits this site, the app will list scraped articles or tell the user to go scrape articles. Each scraped article is saved to the application database. The app displays the following information for each article:

     * Headline - the title of the article

     * URL - the url to the original article

     * Feel free to add more content to your database (photos, bylines, and so on).

  2. Users can save articles, leave comments on the articles displayed and revisit them later. The comments are saved to the database and associated with their articles. Articles and comments can be deleted.
