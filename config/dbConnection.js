let mongodb = require('mongodb');

let connMongodb = function() {
    let db = new mongodb.Db(
        'got', 
        new mongodb.Server(
            'localhost', //String contendo o endereço do servidor
            27017, //Porta de conexão com o mongodb
            {}
        ),
        {}
    );
    
    return db;
}

module.exports = function() {
    return connMongodb;
}