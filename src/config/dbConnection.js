let mongodb = require('mongodb');
require('dotenv').config();

let connMongodb = function() {
    let db = new mongodb.Db(
        'got', 
        new mongodb.Server(
            process.env.DB_HOST, //String contendo o endereço do servidor
            process.env.DB_PORT, //Porta de conexão com o mongodb
            {}
        ),
        {}
    );
    
    return db;
}   

module.exports = function() {
    return connMongodb;
}   