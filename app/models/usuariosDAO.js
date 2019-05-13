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

module.exports = function() {
    return UsuariosDAO;
}