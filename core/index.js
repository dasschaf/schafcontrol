//
//  SchafControl TrackMania Forever Server Controller.
//
//  see License in the Git repository.
//

//-- require: node modules --//
let gbxremote = require('gbxremote');


//-- require: other files --//
let settings = require('./include/settings');


//-- set up connections variables --//
//
// 1: server
let server = require('./include/c.server');
//server.connect();

// 2: database
let db = require('./include/c.mongodb');
db.connect();

console.log('this should happen as last.');
