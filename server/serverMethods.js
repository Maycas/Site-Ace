// Ensure indexes for search functions
Websites._ensureIndex({
  title: "text",
  url: "text",
  description: "text"
});


// Server side methods
Meteor.methods({
  getRequest: function(url) {
    return HTTP.get(url, {
      timeout: 3000
    });
  },
  remoteSearch: function(query) {
    var searchResults = Websites.find({
      $text: {
        $search: query
      }
    }).fetch();
    //console.log('Server call search: ', query, ' are: ', searchResults[0], 'length: ', searchResults.length);
    var ids = [];
    for (i = 0; i < searchResults.length; i++) {
      ids.push(searchResults[i]._id);
    }
    //console.log('Server: ', ids);
    return ids;
  }
});
