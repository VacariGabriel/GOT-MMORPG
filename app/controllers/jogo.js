module.exports.jogo = function(application, req, res) {
    if(req.session.autorizado !== true) { //Verifica se o usuario esta autorizado (Models/usuariosDAO)
        res.send("Faça o login!");
        return ;
    }   

    //Verifica se algo faltou não foi preenchido no formulário ( função ordenar_acao_sudito )
    let msg = '';
    if(req.query.msg != '') {
        msg = req.query.msg;
    }
    
    let usuario = req.session.usuario;
    let casa = req.session.casa;
    
    let connection = application.config.dbConnection;
    let jogoDAO = new application.app.models.jogoDAO(connection);
    
    
    jogoDAO.iniciaJogo(res, usuario, casa, msg);
    
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

    //recupera as ações inseridas no banco
    let connection = application.config.dbConnection;
    let jogoDAO = application.models.jogoDAO(connection);

    let usuario = req.session.usuario;

    jogoDAO.getAcoes(usuario);

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
        res.redirect('jogo?msg=A');
        return ;
    } 

    let connection = application.config.dbConnection;
    let jogoDAO = new application.app.models.jogoDAO(connection);

    dadosForm.usuario = req.session.usuario;
    jogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B');
}