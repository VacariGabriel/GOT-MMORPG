/* importar as configurações do servidor */
let app = require('./config/server');

// Definindo a porta
const port = 2000;

/* parametrizar a porta de escuta */
app.listen(port, () => {
	console.log(`Servidor Online! ${port}`);
})