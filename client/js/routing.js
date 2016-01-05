// Add the routes for the app
Router.configure({
  layoutTemplate: "ApplicationLayout"
});

// Render the main page template
Router.route('/', function() {
  this.render('navbar', {
    to: "navbar"
  });
  this.render('websites_view', {
    to: "main"
  });
  this.render('footer', {
    to: "footer"
  });
});

// Render the website details page
Router.route('/websites/:_id', function() {
  this.render('navbar', {
    to: 'navbar'
  });
  this.render('website_detail', {
    to: 'main',
    data: function() {
      return Websites.findOne({
        _id: this.params._id
      });
    }
  });
  this.render('footer', {
    to: 'footer'
  });
});

// Render the search page
Router.route('/search_results', function() {
  this.render('navbar', {
    to:'navbar'
  });
  this.render('website_search', {
    to: 'main'
  });
  this.render('footer', {
    to: 'footer'
  });
});
