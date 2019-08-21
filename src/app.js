/* importar as configurações do servidor */
let app = require('./config/server');
require('dotenv').config();


// Definindo a porta
const PORT = process.env.PORT;

/* parametrizar a porta de escuta */
app.listen(PORT, () => {
	console.log(`Servidor Online! ${PORT}`);
})