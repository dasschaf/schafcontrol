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
let server = require('./include/c.server').server;
server.query('ChatSendServerMessage', ["SchafControl is starting ..."]);
console.log('- Startup -: Successfully established a connection to the TrackMania Server! (' + process.uptime() + ')');

// 2: database
let db = require('./include/c.mongodb');
db.connect();

console.log('this should happen as last.');
