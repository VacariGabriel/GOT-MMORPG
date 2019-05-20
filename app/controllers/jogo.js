module.exports.jogo = function(application, req, res) {
    if(req.session.autorizado != true) {
        res.send("Faça o login!");
        return ;
    }   

    let usuario = req.session.usuario;

    let connection = application.config.dbConnection;
    let jogoDAO = new application.app.models.jogoDAO(connection);
    
    jogoDAO.iniciaJogo(res, usuario, req);
    
}

module.exports.sair = function(application, req, res) {
    req.session.destroy(function() {
        res.render("index", {validation: {}});
    });
}