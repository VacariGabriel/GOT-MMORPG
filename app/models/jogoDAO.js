function JogoDAO(connection) {
    this._connection = connection(); //o underline é um conveção e diz que não deve ser usada fora do módulo.
}

JogoDAO.prototype.gerarParametros = function(dadosForm) {
    this._connection.open((error, mongoclient) => { // abri a conexão com o servidor e me conectei com o banco de dados
        mongoclient.collection("jogo", (error, collection) => { // executa a função collection
            collection.insert({
                usuario: dadosForm,
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });
            mongoclient.close();
        });
    });
}

JogoDAO.prototype.iniciaJogo = function(res, usuario, req ) {
        this._connection.open((error, mongoclient) => { // abri a conexão com o servidor e me conectei com o banco de dados
        mongoclient.collection("jogo", (error, collection) => { // executa a função collection
            collection.find({usuario : usuario}).toArray(function(err, result) {
                console.log(result);
                res.render('jogo.ejs', {img_casa: req.session.casa, jogo: result[0]});

                mongoclient.close();
            });

        });
    });
}


module.exports = function() {
    return JogoDAO;
}