// Add the routes for the app
Router.configure({
    layoutTemplate: "ApplicationLayout"
});

Router.route('/', function () {
    this.render('navbar', {
        to: "navbar"
    });
    this.render('website_form', {
        to:"website_form"
    });
    this.render('website_list', {
        to:"website_list"
    });
});
