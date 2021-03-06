// Validates a correct URL
this.validateUrl = function(url) {
  if (url === "" || url === null || url === undefined) {
    alert("Please fill in a valid URL");
    return false;
  }
  return true;
};

// Validates a correct description
this.validateDescription = function(description) {
  if (description === "") {
    alert("Please fill in a description");
    return false;
  }
  return true;
};

// Validates the form data (valid url and description)
this.validateAddWebsiteForm = function(url, description) {
  // Check if the form has been filled in with a url and a description
  if (validateUrl(url) && validateDescription(description)) {
    return true;
  }
  return false;
};

// Adds http:// at the beginning if the introduced URL doesn't have it
this.formatUrl = function(url) {
  if (!/^((http|https|ftp):\/\/)/.test(url)) {
    url = "http://" + url;
  }
  return url;
};

// Sets the proper title in case there's no title take the URL as the title
this.normalizeTitle = function(title, url) {
  if (title === "") {
    title = url;
  }
  return title;
};

// Sets a vote when a vote button is clicked
this.setVote = function(votes_collection, websites_collection, website_id, vote_value) {
  var user_id = Meteor.userId();
  //console.log("User logged in with id " + user_id);

  var votes_id;
  var voted_site = votes_collection.findOne({
    website_id: website_id,
    user: user_id
  });
  if (voted_site) {
    votes_id = voted_site._id;
  }
  //console.log("Entry in the database " + votes_id);

  if (user_id) {
    if (votes_id && voted_site.vote !== vote_value) {
      //console.log("updating");

      votes_collection.update({
        _id: votes_id
      }, {
        $set: {
          vote: vote_value
        }
      });

      // Update the total votes of the updated website
      totalVotesUpdate(websites_collection, votes_collection, website_id);
    } else if (!votes_id) {
      //console.log("inserting");

      votes_collection.insert({
        website_id: website_id,
        user: user_id,
        vote: vote_value
      });

      // Update the total votes of the updated website
      totalVotesUpdate(websites_collection, votes_collection, website_id);
    } else {
      //console.log("already voted and existing in database");
    }
  } else {
    alert("Sign in to vote");
  }
};

// Update the total count of 'upvotes' and 'downvotes'
this.totalVotesUpdate = function(websites_collection, votes_collection, website_id) {
  var upvotes = votes_collection.find({
    website_id: website_id,
    vote: 1
  }).count();

  var downvotes = votes_collection.find({
    website_id: website_id,
    vote: -1
  }).count();

  websites_collection.update({
    _id: website_id
  }, {
    $set: {
      upvotes: upvotes,
      downvotes: downvotes
    }
  });
};

// Sets the class of the votes button depending on what the user has voted
this.buttonClass = function(btnClass, website_id, vote_value) {
  var voted_site = Votes.findOne({
    website_id: website_id,
    user: Meteor.userId()
  });

  if (voted_site) {
    if (voted_site.vote === vote_value) {
      return btnClass;
    }
  }
  return "btn-default";
};
