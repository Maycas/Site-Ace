// Server side methods
Meteor.methods({
  getRequest: function(url) {
    return HTTP.get(url, {
      timeout: 3000
    });
  }
});
