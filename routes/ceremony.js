/*
 * GET ceremony page.
 */
 
exports.ceremony = function (req, res) {

    // This static page will show the information about the Bouddhist ceremony,
    //  may be the same that in the 'livret'

	"use strict";

    res.render('ceremony', {pageTitle: 'Ceremony'});
};