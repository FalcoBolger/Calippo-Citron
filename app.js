/**
 * @fileOverview Controller of the application.
 * @author <a href="mailto:victor.tabuenca@gmail.com">Victor Tabuenca</a>
 * @version 0.0.1
*/

/**
 * Module dependencies
 */
 
var express = require('express'),
    routes  = require('./routes'),
    map     = require ('./maproutecontroller'),
    http    = require('http'),
    stylus  = require('stylus');

// Still need to investigate multilingual options

//var lingua = require('lingua');
//var i18next = require('i18next');

//i18next.init();

var app = express();

app.configure(function () {

    "use strict";

    /**
    * Views configuration
    */

    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    
    /**
    * ExpressJS configuration
    */

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.staticCache({maxObjects: 100, maxLength: 512}));
    
    /**
    * Stylus configuration
    */

    app.use(stylus.middleware({
        src: __dirname + '/views/stylus',
        dest: __dirname + '/public/stylesheets'
    }));
    
    /*
    * Folders:
    *   /public
    *   /public/stylesheets
    *   /public/javascripts
    */
    
    app.use(express.static(__dirname + '/public'));
    
    /**
    * Lingua configuration
    */

    //app.use(lingua(app, {
    //    defaultLocale: 'es-es',
    //    path: __dirname + '/i18n'
    //}));

    /**
    * ExpressJS configuration
    */

    app.use(express.cookieParser());    //
    app.use(express.bodyParser());      //
    app.use(express.methodOverride());  //
    app.use(app.router);                //
    app.use(express.directory(__dirname + '/public'));
    app.use(function (req, res, next) {
        throw new Error(req.url + ' not found');
    });
    app.use(function (err, req, res ,next) {
        console.log(err);
        res.send(err.message);
    });
    
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

app.get('/', routes.index);                 // Show home

var prefixes = ['article'];

app.get('/ceremony', routes.ceremony);      // Show the ceremony page

app.get('/reception', routes.reception);    // Show the reception page

app.get('/login', routes.getlogin);         // Show the login page

app.post('/login', routes.postLogin);       // Login to the application

app.get('/articles', routes.articles);      // Show all the created articles

app.get('/article/new', routes.newArticle); // Show

app.post('/article', routes.article);       // Create a new article

http.createServer(app).listen(process.env.PORT || 3000);

console.log("Express server listening on port %d in %s mode",
        app.address().port, app.settings.env);