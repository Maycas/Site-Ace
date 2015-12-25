// Sets a vote when a vote button is clicked
this.setVote = function (votes_collection, websites_collection, website_id, vote_value) {
  var user_id = Meteor.userId();
  console.log("User logged in with id " + user_id);

  var votes_id;
  var voted_site = votes_collection.findOne({
    website_id: website_id,
    user: user_id
  });
  if (voted_site) {
    votes_id = voted_site._id;
  }
  console.log("Entry in the database " + votes_id);

  if (user_id) {
    if (votes_id && voted_site.vote !== vote_value) {
      console.log("updating");

      votes_collection.update({
        _id: votes_id
      }, {
        $set: {
          vote: vote_value
        }
      });

      // Update the total votes of the updated website
      totalVotesUpdate(websites_collection, votes_collection, website_id);
    } else if (!votes_id){
      console.log("inserting");

      votes_collection.insert({
        website_id: website_id,
        user: user_id,
        vote: vote_value
      });

      // Update the total votes of the updated website
      totalVotesUpdate(websites_collection, votes_collection, website_id);
    } else {
      console.log("already voted and existing in database");
    }
  } else {
    alert("Sign in to vote");
  }
};

// Update the total count of 'upvotes' and 'downvotes'
this.totalVotesUpdate = function (websites_collection, votes_collection, website_id) {
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
this.buttonClass = function (btnClass, website_id, vote_value) {
  var voted_site = Votes.findOne({
    website_id: website_id,
    user: Meteor.userId()
  });

  if (voted_site) {
    if(voted_site.vote === vote_value) {
      return btnClass;
    }
  }
  return "btn-default";
};
