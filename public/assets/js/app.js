
console.log("This is app.js");
// Grab the articles as a json
$(function() {
  $.getJSON("/articles", function(data) {
  // For each one
  // $("#articles").empty();
  console.log("data.length: " + data.length);
  for (var i = 0; i < data.length; i++) {
    console.log("Appending: " + i);
    // Display the apropos information on the page
    $("#articles").append("<h6 data-id='" + data[i]._id + "'>" + data[i].title + "</h6><p>" + data[i].link + "</p><hr>");
  };
  if(data.length===0){
    $("#getArticlesNote").append("<h4 class='text-center mx-auto'>Go get more articles.</h4>");
    }else
      {
       $("#getArticlesNote").empty();
  };
});


// Whenever someone clicks a p tag
$(document).on("click", "h6", function() {
  // jQuery.noConflict(); 
  // $("#noteplace").modal("show"); 
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
        // jQuery.noConflict(); 
       // $("#noteplace").modal("show"); 
      // The title of the article
      $("#notes").append("<p>Add a note about this story:</p>");
      $("#notes").append("<h6 class = 'text-danger'>" + data.title + "</h6>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' placeholder='Note Title' name='title' class ='mb-2 form-control'>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput'placeholder='Note Content' name='body' class ='mb-2 form-control' rows = '12'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button type='button' class='btn btn-secondary' data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
  });

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

});
