// start up function that creates entries in the Websites databases.
Meteor.startup(function() {
  // code to run on server at startup
  if (!Websites.findOne()) {
    console.log("No websites yet. Creating starter data.");
    Websites.insert({
      title: "Goldsmiths Computing Department",
      url: "http://www.gold.ac.uk/computing/",
      description: "This is where this course was developed.",
      createdOn: new Date(),
      upvotes: 4,
      downvotes: 2,
      comments: [
        "Pretty cool and awesome website",
        "Can't believe it but it has awesome information"
      ]
    });
    Websites.insert({
      title: "University of London",
      url: "http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
      description: "University of London International Programme.",
      createdOn: new Date(),
      upvotes: 0,
      downvotes: 1,
      comments: []
    });
    Websites.insert({
      title: "Coursera",
      url: "http://www.coursera.org",
      description: "Universal access to the world’s best education.",
      createdOn: new Date(),
      upvotes: 5,
      downvotes: 0,
      comments: []
    });
    Websites.insert({
      title: "Google",
      url: "http://www.google.com",
      description: "Popular search engine.",
      createdOn: new Date(),
      upvotes: 4,
      downvotes: 3,
      comments: []
    });
  }
});