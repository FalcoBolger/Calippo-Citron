/*
 * GET login page.
 */
 
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
 
exports.getLogin = function (req, res) {
    
    "use strict";
    
    res.render('login', {pageTitle: 'Login'});
};

exports.postLogin = function (req, res) {

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
    
};