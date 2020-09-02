//
//  settings file
//
//  it should be documented...
//

exports.mongodb =
    {

        // MongoDB settings
        //
        // url:
        // MongoDB connection URI, refer to https://docs.mongodb.com/manual/reference/connection-string/
        // In the default case the URI is 'mongodb://localhost:27017' if MongoDB runs on your this computer - use a different URI if you use a MongoDB Atlas cluster for example.
        url: 'mongodb://localhost:27017',

        // options:
        // MongoDB options object - change only if you know what you're doing!
        options:
        {
            // connection pool size for the reusable connection object:
            poolSize: 10,

            // URL parser setting - always have to be true!
            useNewUrlParser: true,

            // ??
            useUnifiedTopology: true
        },

        // database:
        // the name of your database, set this to the name of the database you created on the MongoDB instance you use
        db: ''

    };

exports.server =
    {
        // TrackMania server settings
        //
        // host:
        // The machine your TM server runs on. This is classically localhost. Or 127.0.0.1. Or [::1].
        // The script requires your server to run on the same machine in order to be able to add tracks and some other features - pure record handling could work without it running off the same computer, but it's easier this way.
        host: '127.0.0.1',

        // port:
        // The port your TrackMania server listens at. Usually this is 5001, but varies if you have multiple servers.
        // The port is set in the server's dedicated_cfg.txt
        port: 5001,

        // login:
        // The login for the SuperAdmin authorization level.
        // The login is set in the server's dedicated_cfg.txt
        login: 'SuperAdmin',

        // password:
        // The password for the SUperAdmin authorization level.
        // The password is set in the server's dedicated_cfg.txt
        password: ' p a s s w o r d ',

        // masterserver_login:
        // The login of your server, which it is registered to at the Master server of TMF.
        // The login is set in the server's dedicated_cfg.txt as well as on the TMF player page.
        masterserver_login: ' l o g i n ',

        // stunt_mode:
        // Whether the server runs in Stunt mode or not, important regarding how the
        // Local Records are dealt with - if it's a stunt mode server the scores will be treated
        // as actual numbers and not as time in milliseconds
        stunt_mode: false
    };

exports.masteradmin =
    {
        // masteradmin login:
        // The login of the player that is supposed to have control over everything in the script later, ideally set this to be your own login.
        login: '',

        // masteradmin title:
        // your future personal title! Supports all kinds of TM formatting for colours and text stuff.
        title: ''
    };