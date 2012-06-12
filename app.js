/**
 * @fileOverview Controller of the application.
 * @author <a href="mailto:victor.tabuenca@gmail.com">Victor Tabuenca</a>
 * @version 0.0.1
*/

var express = require('express');

// Still need to investigate multilingual options

//var lingua = require('lingua');
//var i18next = require('i18next');

//i18next.init(); 

var app = express.createServer();

app.configure(function () {
  
    "use strict";

    // Views configuration       

    app.set("view options", { layout: false });     // Change options object later
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    
    // Lingua configuration

    //app.use(lingua(app, {
    //    defaultLocale: 'es-es',
    //    path: __dirname + '/i18n'
    //}));

    // ExpressJS configuration

    app.use(express.cookieParser());    //
    app.use(express.bodyParser());      //
    app.use(express.methodOverride());  //
    app.use(app.router);                //
    
    //app.use(i18next.handle);
    
    /*
    * Folders:
    *   /public
    *   /public/stylesheets
    *   /public/javascripts
    */
    
    app.use(express.static(__dirname + '/public'));
});

//

app.configure('development', function(){
    
    "use strict";
    
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//

app.configure('production', function(){
    
    "use strict";
    
    app.use(express.errorHandler());
});

//i18next.registerAppHelper(app);

app.listen(process.env.PORT || 8000);

// Simple DB for testing purposes. This will be changed when the real DB would
//  be ready

var users = [
    // Privileged user
    {
        id: "calippo.citron",
        pwd: "calippo.citron",
        email: "calippo.citron@gmail.com",
        roles: ["canPost"]
    },
    // Normal user
    {
        id: "anon.user",
        pwd: "anon.user",
        email: "anon.user@gmail.com",
        roles: []
    }
];
var articles = [];

// Get the initial view of the application, the 'index.html' static page
//  corresponding to the 'Home' link

app.get('/', function (req, res) {

    // This static page will show some information about us, the wedding or
    //  something like that

    "use strict";
    
    res.render('index', {pageTitle:'Victor and Yasmina\'s Wedding'});
});

// Read all the created Blogposts, the 'news.html' dynamic page corresponding to
//  the 'News' link

app.get('/articles', function (req, res) {
    
    // Here the DB will requested to provide all the articles stored in it, and
    //  the use of pagination will be compulsory.
    //  Users of the site should be able to add comments to each article
    //  Modify to implement the Commander Pattern, GetArticlesCommand

    "use strict";

    res.send(articles);
});

// Get the information related to the Bouddhist ceremony, the 'ceremony.html'
//  page corresponding to the 'Ceremony' link

app.get('/ceremony', function (req, res) {

    // This static page will show the information about the Bouddhist ceremony,
    //  may be the same that in the 'livret'

    "use strict";

    res.render('ceremony', {pageTitle: 'Ceremony'});
});

// Get the information related to the Reception, the 'reception.html' page
//  corresponding to the 'Reception' link

app.get('/reception', function (req, res) {

    // This static page will show the information about the reception, how to
    //  arrive, the place itself, etc.

    "use strict";

    res.render('reception', {pageTitle: 'Reception'});
});

app.get('/login', function (req, res) {
    
    "use strict";
    
    res.render('login', {pageTitle: 'Login'});
});

// Login to the application

app.post('/login', function (req, res) {

    // This is the application form to authenticate users as being able to do
    //  some tasks like posting new articles to the application.
    // Create the session object or a cookie

    "use strict";
    
    console.log(req.body);
    
    // First check for session object or cookie
    
    // This will change to meet the DB
    
    var user = (function (username) {
        var i;
        for (i=0; i<users.length; i++) {
            if (users[i].id === username) {
                return users[i];
            }
        }
    })(req.body.username);
    
    // This will change to meet the DB
    
    var canPost = (function (user) {
        var i;
        for (i=0; i<user.roles.length; i++) {
            if (user.roles[i] === "canPost") {
                return true
            }
        }
        return false;
    })(user);
    
    if (user instanceof Object && user.pwd === req.body.password && canPost) {        
        res.send("Authenticated");
    } else {
        res.send("Not Authenticated");
    }
    
    // Implement some kind of captcha
    
});

app.get('/article/new', function (req,res) {
     if (!req.cookies || req.cookies.articleaccess || 
            req.cookies.articleacces !== "AOK") {
        res.redirect('/login');
    } else {
        res.render('article', {pageTitle: 'New Article'});
    }
});

// Create a new Blogpost

app.post('/article', function (req, res) {

    // This is the entry point for adding new articles to the Blog. Nees to 
    //  include an authorization mechanism (sessions, cookies, ...)

    "use strict";
    
    console.log(req.body);

    // Modify to implement the Commander Pattern
    
    if (req.body && req.body.article) {
        articles.push(req.body.article);
        if (req.body.article.published === "true") {
            res.send({
                status: "ok",
                message: "Article Published"
            });
        } else {
            res.send({
                status: "ok",
                message: "Article Received"
            });
        }
    } else {
        res.send({
            status: "nok",
            message: "No Articles Received"
        });
    }
});
