/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
  websites: function() {
    return Websites.find({}, {
      sort: {
        upvotes: -1,
        downvotes: 1,
      }
    });
  },
});

Template.website_item.helpers({
  upvotes: function() {
    return Websites.findOne({
      _id: this._id
    }).upvotes;
  },
  downvotes: function() {
    return Websites.findOne({
      _id: this._id
    }).downvotes;
  },
  date: function() {
    return Websites.findOne({
      _id: this._id
    }).createdOn;
  }
});

/////
//template events
/////

//TODO: Allow voting or downvoting once for each user
Template.website_item.events({
  "click .js-upvote": function(event) {
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;
    console.log("Up voting website with id " + website_id);

    

    // Insert the votes to the database
    Websites.update({
      _id: website_id
    }, {
      $inc: {
        upvotes: 1
      }
    });

    return false; // prevent the button from reloading the page
  },

  "click .js-downvote": function(event) {
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;
    console.log("Down voting website with id " + website_id);

    // TODO: put the code in here to remove a vote from a website!

    // Insert the votes to the database
    Websites.update({
      _id: website_id
    }, {
      $inc: {
        downvotes: 1
      }
    });

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
    if (url === "") {
      alert("Please fill in a URL");
      return false;
    }
    if (description === "") {
      alert("Please fill in a description");
      return false;
    }
    // Add http:// at the beginning if the URL doesn't have it
    if (!/^((http|https|ftp):\/\/)/.test(url)) {
      url = "http://" + url;
    }
    // In case there's no title take the URL as the title
    if (title === "") {
      title = url;
    }

    // Add the new entry into the database
    if (Meteor.user()) {
      Websites.insert({
        title: title,
        url: url,
        description: description,
        createdOn: new Date(),
        votes: 0,
        comments: []
      });
    }

    return false; // stop the form submit from reloading the page
  }
});
