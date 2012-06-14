/*
 * GET articles page.
 */
 
var articles = [];
 
exports.articles = function (req, res) {
    
    // Here the DB will requested to provide all the articles stored in it, and
    //  the use of pagination will be compulsory.
    //  Users of the site should be able to add comments to each article
    //  Modify to implement the Commander Pattern, GetArticlesCommand

    "use strict";

    // Modify to use res.render()
    
    res.send(articles);
};

exports.newArticle = function (req,res) {

    "use strict";

    if (!req.cookies || req.cookies.articleaccess ||
            req.cookies.articleacces !== "AOK") {
        res.redirect('/login');
    } else {
        res.render('article', {pageTitle: 'New Article'});
    }
};

exports.article = function (req, res) {

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
};