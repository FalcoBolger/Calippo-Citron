/*
 * GET home page.
 */

exports.index = function (req, res) {

    // This static page will show some information about us, the wedding or
    //  something like that

    "use strict";
    
    res.render('index', {pageTitle:'Victor and Yasmina\'s Wedding'});
};

exports.reception = function (req, res) {

    // This static page will show the information about the reception, how to
    //  arrive, the place itself, etc.

    "use strict";

    res.render('reception', {pageTitle: 'Reception'});
};