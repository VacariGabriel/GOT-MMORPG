// DAO - Data Acess Object

function UsuariosDAO(connection) {
    this._connection = connection(); //o underline é um conveção e diz que não deve ser usada fora do módulo.
}

UsuariosDAO.prototype.inserirUsuario = function(dadosFormulario) {
    this._connection.open((error, mongoclient) => { // abri a conexão com o servidor e me conectei com o banco de dados
        mongoclient.collection("usuarios", (error, collection) => { // executa a função collection
            collection.insert(dadosFormulario);
            mongoclient.close();
        });
    });
}

UsuariosDAO.prototype.autenticar = function(dadosLogin, req, res) {
    this._connection.open((error, mongoclient) => { 
        mongoclient.collection("usuarios", (error, collection) => { 
            collection.find({usuario: {$eq: dadosLogin.usuario}, senha: {$eq: dadosLogin.senha}}).toArray((err, result) => {

                if(result[0] != undefined) {
                    req.session.autorizado = true; 
                    req.session.usuario = result[0].usuario; 
                    req.session.casa = result[0].casa; 
                }

                if(req.session.autorizado)
                    res.redirect("jogo");
                else
                    res.render("index", {validation: {}});
                
                
            });
            mongoclient.close();
        });
    });
}

module.exports = function() {
    return UsuariosDAO;
}