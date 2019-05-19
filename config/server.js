/* importar o módulo do framework express */
let express = require('express');

/* importar o módulo do consign */
let consign = require('consign');

/* importar o módulo do body-parser */
let bodyParser = require('body-parser');

/* importar o módulo do express-validator */
let expressValidator = require('express-validator');

/* importar o módulo do express-session */
let expressSession = require('express-session');

/* iniciar o objeto do express */
let app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());
/* configurar o middleware express-session */
app.use(expressSession({
	secret: 'JSJSJSJS', //ID DE REFERENCIA DO COOKIE QUE É GERADO
	resave: false, //SE TRUE, FAÇA COM QUE A SEÇÃO SEJA GRAVADA NO SERVIDOR
	saveUninitilized: false //SE TRUE, CRIA UM NOVA SEÇÃO TODA VEZ QUE FOR MODIFICADO
}));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.then('config/dbConnection.js') //Para não gerar um loop infinito de criação de banco, necessário passar a extensão do arquivo
	.into(app);
	
/* exportar o objeto app */
module.exports = app;