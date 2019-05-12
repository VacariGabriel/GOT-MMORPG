module.exports.cadastro = function(application, req, res) {
    res.render('cadastro.ejs', {validation: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res) {
    let dadosForm = req.body;

    req.assert('nome', 'Preencha o nome corretamente').notEmpty();
    req.assert('usuario', 'Preencha o usuario corretamente').notEmpty();
    req.assert('senha', 'Preencha o senha corretamente').notEmpty();
    req.assert('casa', 'Preencha a casa corretamente').notEmpty();

    let errors = req.validationErrors();

    if(errors) {
        res.render('cadastro.ejs', {validation: errors, dadosForm: dadosForm});
        return ;    
    }


    res.send('Podemos Cadastrar');
    
}