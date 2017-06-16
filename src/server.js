var express = require('express'); // Minimalist web framework
var bodyParser = require('body-parser'); // Node.js body parsing middleware. Needed by Express to handle JSON
var mongoClient = require('mongodb').MongoClient; // The official MongoDB driver for Node.js
var assert = require('assert'); // Actually for writing unit tests but used here for checking database actions
var config = require('./config'); // Some common configuration to be shared with backend and frontend

const myServer = new express();
const myConfig = new config();
const myDbUrl = 'mongodb://localhost:27017/myproject'; // Does not need to be known by the client, therefore not a part of the common config

myServer.use(bodyParser.json());
// "Global", always set on all responses
myServer.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', myConfig.host + myConfig.clientPort); // Allow the client to access
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Needed for the client to POST
    next();
});

// GET all items
myServer.get(myConfig.itemsEndpoint, function (req, res) {
    function findItems(db, callback) {
        let data = [];
        var cursor = db.collection('todolist').find( );
        cursor.each(function(err, item) {
            assert.equal(err, null);
            if (item !== null) {
                data.push({id: item.id, text: item.text});
            } else {
                callback(data);
            }
        });
    }
    mongoClient.connect(myDbUrl, function(err, db) {
        assert.equal(null, err);
        findItems(db, function(data) {
            db.close();
            res.json(data);
        });
    });
});

// POST one item
myServer.post(myConfig.itemsEndpoint, function (req, res) {
    function insertItem(db, item, callback) {
        var collection = db.collection('todolist');
        collection.insertOne(item, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            console.log('Inserted 1 item');
            callback();
        });
    }
    mongoClient.connect(myDbUrl, function(err, db) {
        assert.equal(null, err);
        insertItem(db, req.body, function() {
            db.close();
        });
    });

    res.json(req.body);
});

myServer.listen(myConfig.serverPort, function () {
    console.log('Server listening on port ' + myConfig.serverPort);
});
