/*
 * GET home page.
 */

exports.index = function (req, res) {

    // This static page will show some information about us, the wedding or
    //  something like that

    "use strict";
    
    res.render('index', {pageTitle:'Victor and Yasmina\'s Wedding'});
};