module.exports.jogo = function(application, req, res) {
    if(req.session.autorizado !== true) { //Verifica se o usuario esta autorizado (Models/usuariosDAO)
        res.send("Faça o login!");
        return ;
    }   

    //Verifica se algo faltou não foi preenchido no formulário ( função ordenar_acao_sudito )
    let comando_invalido = 'N';
    if(req.query.comando_invalido == 'S') {
        comando_invalido = 'S';
    }
    
    let usuario = req.session.usuario;
    let casa = req.session.casa;
    
    let connection = application.config.dbConnection;
    let jogoDAO = new application.app.models.jogoDAO(connection);
    
    
    jogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
    
}

module.exports.sair = function(application, req, res) {
    req.session.destroy(function() {
        res.render("index", {validation: {}});
    });
}

module.exports.suditos = function(application, req, res) {
    if(req.session.autorizado !== true) {
        res.send("Faça o login!");
        return ;
    } 

    res.render("aldeoes", {validation: {}});
}

module.exports.pergaminhos = function(application, req, res) {
    if(req.session.autorizado !== true) {
        res.send("Faça o login!");
        return ;
    } 

    res.render("pergaminhos", {validation: {}});
}

module.exports.ordenar_acao_sudito = function(application, req, res) {
    if(req.session.autorizado !== true) {
        res.send("Faça o login!");
        return ;
    } 

    let dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informado').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informado').notEmpty();

    let errors = req.validationErrors();

    if(errors) {
        res.redirect('jogo?comando_invalido=S');
        return ;
    } 

    res.send('Ok');
}