//
//  SchafControl TrackMania Forever Server Controller.
//
//  see License in the Git repository.
//

//-- require: node modules --//
let gbxremote = require('gbxremote');


//-- require: other files --//
let settings = require('./include/settings.js');
let database = require('./include/mongodb.js');


//-- set up connection variables --//
let server = gbxremote.createClient(settings.server.host, settings.server.port);


//-- set up connection to TMF server --//
server.on('connect', () =>
{
    server.query('Authenticate', [settings.server.login, settings.server.password]).then(result =>
        {

        },
        reject =>
        {

        });

    server.query('EnableCallbacks', [true]).then(result =>
        {

        },
        reject =>
        {

        });
});

//-- 

