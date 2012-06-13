/**
 * @fileOverview Controller of the application.
 * @author <a href="mailto:victor.tabuenca@gmail.com">Victor Tabuenca</a>
 * @version 0.0.1
*/

/**
 * Module dependencies
 */
 
var express = require('express');
//var stylus = require('stylus');
var routes = require('./routes');

// Still need to investigate multilingual options

//var lingua = require('lingua');
//var i18next = require('i18next');

//i18next.init(); 

var app = module.exports = express.createServer();

app.configure(function () {
  
    "use strict";

    // Views configuration       

    //app.set("view options", { layout: false });     // Change options object later
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    
    app.use(express.favicon());
    
    app.use(express.logger('dev'));
    
    //app.use(express.staticCache({maxObjects: 100, maxLength: 512}));
    
//    app.use(stylus.middleware({
//        src: __dirname + '/views/stylus',
//        dest: __dirname + '/public/stylesheets'
//    }));
    
    /*
    * Folders:
    *   /public
    *   /public/stylesheets
    *   /public/javascripts
    */
    
    app.use(express.static(__dirname + '/public'));
    
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
    //app.use(express.directory(__dirname + '/public'));
    
    //app.use(i18next.handle);
        
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

/**
 * Routes
 */

// Get the initial view of the application, the 'index.html' static page
//  corresponding to the 'Home' link

app.get('/', routes.index);

// Show the login page

app.get('/login', routes.getlogin);

// Get the information related to the Bouddhist ceremony, the 'ceremony.html'
//  page corresponding to the 'Ceremony' link

app.get('/ceremony', routes.ceremony);

// Get the information related to the Reception, the 'reception.html' page
//  corresponding to the 'Reception' link

app.get('/reception', routes.reception);

// Login to the application

app.post('/login', routes.postLogin);

// Read all the created Blogposts, the 'news.html' dynamic page corresponding to
//  the 'News' link

app.get('/articles', routes.articles);

// Create a new article page

app.get('/article/new', routes.newArticle);

// Create a new Blogpost

app.post('/article', routes.article);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
