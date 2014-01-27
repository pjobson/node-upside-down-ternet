(function () {
    'use strict';

    var http = require("http"),
        url = require("url"),
        path = require("path"),
        fs = require("fs"),
        port = process.argv[2] || 8888,
        magick = require('imagemagick');

    var server = http.createServer();
    var responseMain,response,imgData;
    var imgPath = '/Users/pjobson/bin/img/';
    var date = new Date();

    server.on('connection', function (request, response) {
        void(0); 
    });

    server.on('request', function(request, responseMain) {
        var imgSRC = request.url.match(/q=(.+)/)[1];
        var imgReq = http.get(imgSRC, function(response) {         
            response.setEncoding('binary');
            imgData='';
    
            response.on('data', function(chunk){
                imgData += chunk;
            });

            response.on('end',function() {
                var ext = response.headers['content-type'].replace(/.+\//,'.');
                var ts  = date.getTime()+'';
                var newImg = imgPath+ts+ext;
                var contentType = response.headers['content-type'];
                fs.writeFile(newImg, imgData, {encoding: 'binary'});
    
                magick.convert([newImg, '-flip', imgPath+'tmp'], function(err, stdout){
                    if (err) throw err;
                    fs.rename(imgPath+'tmp',newImg, function() {
                        fs.readFile(newImg, function(err,data) {
                            responseMain.writeHead(200, {"Content-Type": contentType});
                            responseMain.end(data,'binary');
                        });
                        //responseMain.writeHead(200, {"Content-Type": 'text/plain'});
                        //responseMain.end(date.getTime()+'');
                    });
                });
            });
        });
    });
    server.listen(parseInt(port, 10));
}());