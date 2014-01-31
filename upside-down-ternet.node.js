(function () {
    'use strict';

    var upside_down_ternet = function() {
        var that = this;
        this.http    =require("http");
        this.server  =this.http.createServer();
        this.url     =require("url");
        this.path    =require("path");
        this.fs      =require("fs");
        this.port    =8888;
        this.magick  =require('imagemagick');
        this.md5     =require('MD5');
        this.request =null;
        this.response=null;
        this.resImg  =null;
        this.img     = {
            path: '/Users/pjobson/bin/img/',
            src:  null,
            md5:  null,
            tmp:  null,
            new:  null,
            data: '',
            contentType: null
        };
        
        this.server.listen(parseInt(this.port, 10));
        
        this.server.on('connection', function (request, response) {
            void(0);
        });
        
        this.server.on('request', function (request, response) {
            console.log('request');
            that.response = response;
            that.request  = request;
            that.setImgParams();
            return;
        });
        
        this.setImgParams = function() {
            that.img.src  = that.request.url.match(/q=(.+)/)[1];
            that.img.md5  = that.md5(that.img.src);
            that.img.tmp  = that.img.path+'tmp';
            that.img.new  = that.img.path+that.img.md5;
            that.img.data = '';
            that.img.contentType = '';

            that.imageCheck();
            return true;
        };
        
        this.imageCheck = function() {
            that.fs.stat(that.img.new,function(err,data) {
                if (data) {
                    that.serveImage();
                    return true;
                } else {
                    that.getImage();
                    return true;
                }
            });
        };
        
        this.getImage = function() {
            that.http.get(that.img.src, function(response) {
                response.setEncoding('binary');
                response.on('data', function(chunk){
                    that.img.data += chunk;
                });
                
                response.on('end',function() {
                    that.img.contentType = response.headers['content-type'];
                    that.fs.writeFile(that.img.new, that.img.data, {encoding: 'binary'}, function() {
                        that.modImage();
                    });
                });
                
            });
            return true;
        };
        
        this.modImage = function() {
            that.magick.convert([that.img.new, '-flip', that.img.tmp], function(err, stdout){
                if (err) throw err;
                that.fs.rename(that.img.tmp,that.img.new, function() {
                    that.serveImage();
                });
            });
        };
        
        this.serveImage = function() {
            that.fs.readFile(that.img.new, function(err,data) {
                if (err) throw err;
                that.response.writeHead(200, {"Content-Type": that.img.contentType});
                that.response.end(data,'binary');
            });
        };        
    };
    
    var udt = new upside_down_ternet();
}());
