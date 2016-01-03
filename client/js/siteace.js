//TODO: Implement a search function
//TODO: Implement a website recommender

/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
  websites: function() {
    return Websites.find({}, {
      sort: {
        upvotes: -1,
        downvotes: 1
      }
    });
  },
});

Template.website_item.helpers({
  upvotes: function() {
    return Votes.find({
      website_id: this._id,
      vote: 1
    }).count();
  },
  downvotes: function() {
    return Votes.find({
      website_id: this._id,
      vote: -1
    }).count();
  },
  upvotesButtonClass: function() {
    return buttonClass("btn-success", this._id, 1);
  },
  downvotesButtonClass: function() {
    return buttonClass("btn-danger", this._id, -1);
  },
});


/////
//template events
/////
Template.website_item.events({
  "click .js-upvote": function(event) {
    var website_id = this._id;
    //console.log("Up voting website with id " + website_id);

    setVote(Votes, Websites, website_id, 1);

    return false; // prevent the button from reloading the page
  },

  "click .js-downvote": function(event) {
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;
    //console.log("Down voting website with id " + website_id);

    setVote(Votes, Websites, website_id, -1);

    return false; // prevent the button from reloading the page
  }
});

Template.website_form.events({
  "click .js-toggle-website-form": function(event) {
    $("#website_form").toggle('slow');
  },

  "submit .js-save-website-form": function(event) {
    // Here is an example of how to get the url out of the form:
    var url = event.target.url.value;
    var title = event.target.title.value;
    var description = event.target.description.value;

    // Check if the form has been filled in with a url and a description
    if (validateAddWebsiteForm(url, description)) {
      url = formatUrl(url);
      title = normalizeTitle(title, url);

      console.log(url);
      console.log("title before insertion: " + title);
      console.log(description);

      // Add the new entry into the database
      if (Meteor.user()) {
        Websites.insert({
          title: title,
          url: url,
          description: description,
          upvotes: 0,
          downvotes: 0,
          createdOn: new Date().toUTCString(),
          comments: []
        });
      }
    }

    // Reset all the field values to introduce a new website
    $("#url").val("");
    $("#title").val("");
    $("#description").val("");

    return false; // stop the form submit from reloading the page
  }
});

Template.website_form_body.events({
  'click .js-get-url-info': function(event) {
    // Disable the inputs for title and description while searching for the info
    $("#title").attr("disabled", true);
    $("#description").attr("disabled", true);

    // Get the url and apply proper formatUrl
    var url = $("#url").val();
    if (validateUrl) {
      url = formatUrl(url);
    } else {
      return false;
    }

    // Set the button to a loading state
    $("#getUrlButton").html('<button class="btn btn-default" type="button" id="getUrlButton"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>&nbsp;Loading...</button>');

    // Search for the URL info
    Meteor.call("getRequest", url, function(error, response) {
      if (error) {
        // Clear the URL value to blank so the user can fill in a correct one
        $("#url").val("");
        // Show an error
        alert("There has been an error. Please retry\n" + error);
      } else {
        // Create an HTML document in order to use Jquery
        var doc = document.createElement("html");
        doc.innerHTML = response.content;
        // Get the title
        var title = doc.getElementsByTagName("title")[0].innerHTML;
        // Get the description
        var description;
        var meta = doc.getElementsByTagName("meta");
        var i = 0;
        while (meta[i]) {
          if (meta[i].getAttribute('name') == 'description') {
            if (meta[i].getAttribute("content")) {
              description = meta[i].getAttribute("content");
              break;
            }
          }
          description = "";
          i++;
        }

        // Set the title and the description
        $("#title").val(title);
        $("#description").val(description);
      }

      // Reactivate the input fields in case the user wanted to change something
      $("#title").attr("disabled", false);
      $("#description").attr("disabled", false);

      //Reset the button to the initial state
      $("#getUrlButton").html('<button class="btn btn-default js-get-url-info" type="button" id="getUrlButton"><span class="glyphicon glyphicon-link"></span>&nbsp;Get URL info</button>');
    });

    return false;
  }
});

Template.comment_form.events({
  'submit .js-submit-comment': function(event) {
    var website_id = this._id;
    console.log("Commenting website with id " + website_id);

    // Get the value of the comment
    var comment = event.target.comment.value;

    // Insert the comment into the websites database
    Websites.update({
      _id: website_id
    }, {
      $push: {
        comments: {
          $each: [{
            author: Meteor.user().username,
            text: comment,
            postDate: new Date().toUTCString()
          }],
          $position: 0
        }
      }
    });

    return false; // stop the form submit from reloading the page
  }
});
