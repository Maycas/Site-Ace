//TODO: Implement a search function
//TODO: Use the HTTP package for meteor to get the data from the websites
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
    console.log("Up voting website with id " + website_id);

    setVote(Votes, Websites, website_id, 1);

    return false; // prevent the button from reloading the page
  },

  "click .js-downvote": function(event) {
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;
    console.log("Down voting website with id " + website_id);

    setVote(Votes, Websites, website_id, -1);

    return false; // prevent the button from reloading the page
  }
});

Template.website_form.events({
  "click .js-toggle-website-form": function(event) {
    $("#website_form").toggle('slow');
  },

  "submit .js-save-website-form": function(event) {
    // here is an example of how to get the url out of the form:
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

    return false; // stop the form submit from reloading the page
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
