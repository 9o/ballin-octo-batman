/**
 * FetchController
 *
 * @description :: Server-side logic for managing fetches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  hellolist: function(req, res, next) {
    var Crawler = require("crawler");
    var url = require('url');

    var c = new Crawler({
      maxConnections: 10,
      userAgent: "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
      // This will be called for each crawled page 
      callback: function(error, result, $) {
        // $ is Cheerio by default 
        //a lean implementation of core jQuery designed specifically for the server
        var yourPosition = $('h2').html();
        var positionCount = $('h4').html();
        var referralLink = $('div.col-md-12:nth-child(3) a').html();

        res.json({
          yourPosition: yourPosition,
          positionCount: positionCount,
          referralLink: referralLink
        });
      }
    });

    // Queue just one URL, with default callback 
    // c.queue(req.param('url'));
    var url = "https://app.hellolist.com/lists/" + req.param('listId') + "/entries?email=" + req.param('email');

    c.queue(url);
  }
};