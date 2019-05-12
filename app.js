/* importar as configurações do servidor */
let app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(2000, function(){
	console.log('Servidor online');
})