module.exports.index = function(application, req, res) {
    res.render('index.ejs', {validation: {}});
}

module.exports.autenticar = function(application, req, res) {
    let dadosLogin = req.body;

    req.assert('usuario', 'Usuário Inválido').notEmpty();
    req.assert('senha', 'Senha Inválida').notEmpty();

    let errors = req.validationErrors();

    if(errors) {
        res.render('index', {validation: errors});
        return ;
    }

    let connection = application.config.dbConnection;
    let usuariosDAO = new application.app.models.usuariosDAO(connection);

    usuariosDAO.autenticar(dadosLogin, req, res);

    //res.send('OK!');

}