// start up function that creates entries in the Websites databases.
Meteor.startup(function() {
  // code to run on server at startup
  if (!Websites.findOne()) {
    console.log("No websites yet. Creating starter data.");

    // Create new websites in order to startup
    Websites.insert({
      title: "Goldsmiths Computing Department",
      url: "http://www.gold.ac.uk/computing/",
      description: "This is where this course was developed.",
      upvotes: 0,
      downvotes: 0,
      createdOn: new Date(),
      comments: [
        "Pretty cool and awesome website",
        "Can't believe it but it has awesome information"
      ]
    });
    Websites.insert({
      title: "University of London",
      url: "http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
      description: "University of London International Programme.",
      upvotes: 0,
      downvotes: 0,
      createdOn: new Date(),
      comments: []
    });
    Websites.insert({
      title: "Coursera",
      url: "http://www.coursera.org",
      description: "Universal access to the world’s best education.",
      upvotes: 0,
      downvotes: 0,
      createdOn: new Date(),
      comments: []
    });
    Websites.insert({
      title: "Google",
      url: "http://www.google.com",
      description: "Popular search engine.",
      upvotes: 0,
      downvotes: 0,
      createdOn: new Date(),
      comments: []
    });


    /* TODO: As soon as Minimongo supports $ operators implement the following client query:
    var query = Votes.findOne({ user: "marc" }, { fields: { websites: { $elemMatch: { website_id: Websites.findOne({
      title: "Coursera"
    })._id } } } });

    The database structure will be as follows:

    Votes.insert({
      user: "marc",
      websites: [{
        website_id: coursera,
        vote: "up"
      }, {
        website_id: google,
        vote: "down"
      }]
    });
    */

    // Create new test entries for the votes database
    /*
    Votes.insert({
      website_id: findByTitle(Websites, "Coursera"),
      user: "marc",
      vote: 1
    });
    Votes.insert({
      website_id: findByTitle(Websites, "University of London"),
      user: "marc",
      vote: -1
    });
    Votes.insert({
      website_id: findByTitle(Websites, "Goldsmiths Computing Department"),
      user: "marc",
      vote: -1
    });
    Votes.insert({
      website_id: findByTitle(Websites, "Google"),
      user: "marc",
      vote: 1
    });

    Votes.insert({
      website_id: findByTitle(Websites, "Coursera"),
      user: "pepe",
      vote: -1
    });
    Votes.insert({
      website_id: findByTitle(Websites, "University of London"),
      user: "pepe",
      vote: -1
    });
    Votes.insert({
      website_id: findByTitle(Websites, "Goldsmiths Computing Department"),
      user: "pepe",
      vote: 1
    });
    Votes.insert({
      website_id: findByTitle(Websites, "Google"),
      user: "pepe",
      vote: -1
    });
    */

  }
});


var findByTitle = function (collection, title) {
  return collection.findOne({
    title: title
  })._id;
};
