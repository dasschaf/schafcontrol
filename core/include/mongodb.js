//
//  SchafControl
//  MySQL Connection file
//
//  used to provide a working MySQL Object in any file via
//  let MongoDB = require('./include/mongodb.js');
//

//-- require: node packages --//
let mc = require('mongodb').MongoClient;

//-- require: other files --//
<<<<<<< HEAD
let settings = require('./settings.js');
=======
let settings = require('settings.js');
>>>>>>> master


//-- make the database object --//
mc.connect(settings.mongodb.url, {poolSize: 25}, (err, db) =>
{
    if (err) throw err;

    return db;
});
