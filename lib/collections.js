// List of websites collection
Websites = new Mongo.Collection("websites");

// List of which users have voted which websites
Votes = new Mongo.Collection("votes");

// set up security on the collections
Websites.allow({
  update: function(userId, doc) {
    if (Meteor.user()) {
      return true;
    } else {
      return false;
    }
  },
  insert: function(userId, doc) {
    if (Meteor.user()) {
      return true;
    } else {
      return false;
    }
  },
  remove: function(userId, doc) {
    if (Meteor.user()) {
      return true;
    } else {
      return false;
    }
  }
});

Votes.allow({
  update: function(userId, doc) {
    if (Meteor.user()) {
      return true;
    } else {
      return false;
    }
  },
  insert: function(userId, doc) {
    if (Meteor.user()) {
      return true;
    } else {
      return false;
    }
  },
  remove: function(userId, doc) {
    if (Meteor.user()) {
      return true;
    } else {
      return false;
    }
  }
});
