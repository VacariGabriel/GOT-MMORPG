module.exports.jogo = function(application, req, res) {
    if(req.session.autorizado)
        res.render('jogo.ejs');
    else
        res.send("Faça o login!");
}

module.exports.sair = function(application, req, res) {
    req.session.destroy(function() {
        res.render("index", {validation: {}});
    });
}