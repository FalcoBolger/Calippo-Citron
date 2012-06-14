/*
 * GET home page.
 */
 
exports.reception = function (req, res) {

    // This static page will show the information about the reception, how to
    //  arrive, the place itself, etc.

    "use strict";

    res.render('reception', {pageTitle: 'Reception'});
};