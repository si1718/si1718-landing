"use strict";

/* global __dirname */



var express = require("express");

var bodyParser = require("body-parser");

var helmet = require("helmet");

var path = require('path');

var Type = require('type-of-is');

var accents = require('remove-accents');

var cors = require('cors');

var randToken = require('rand-token');

var isURL = require('is-url');




var  MongoClient = require('mongodb').MongoClient;



var mdbURL = "mongodb://rrv:rrv@ds255455.mlab.com:55455/si1718-rrv-patents";



var port = (process.env.PORT || 10000);

var BASE_API_PATH = "/api/v1";



var db;





MongoClient.connect(mdbURL,{native_parser:true},function (err,database){



    if(err){

        console.log("CAN NOT CONNECT TO DB: "+err);

        process.exit(1);

    }

    

    db = database.collection("patents");

    



    app.listen(port, () => {

        console.log("Magic is happening on port " + port);    

    });



});



var app = express();

app.use(cors());

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.json()); //use default json enconding/decoding

app.use(helmet()); //improve security




