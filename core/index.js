//
//  SchafControl TrackMania Forever Server Controller.
//
//  see License in the Git repository.
//

//-- require: node modules --//
let gbxremote = require('gbxremote');


//-- require: other files --//
let settings = require('./include/settings.js');
<<<<<<< HEAD
//let database = require('./include/mongodb.js');
=======
let database = require('./include/mongodb.js');
>>>>>>> master


//-- set up connection variables --//
let server = gbxremote.createClient(settings.server.host, settings.server.port);


//-- set up connection to TMF server --//
server.on('connect', () =>
{
    server.query('Authenticate', [settings.server.login, settings.server.password]).then(result =>
    {

    }).catch(error =>
    {
        throw error;
    });
    server.query('EnableCallbacks', [true]).then(result =>
    {

    }).catch(error =>
    {
        throw error;
    });
});

server.on('error', (error) =>
{
    console.log(error);
});

//-- wait for the callbacks --//
server.on('TrackMania.PlayerChat', params =>
{

    server.query('ChatSendServerMessage', ["faggot!"]);

});



//-- reject utility --//

function r (object)
{
    console.log(JSON.stringify(object));
}
